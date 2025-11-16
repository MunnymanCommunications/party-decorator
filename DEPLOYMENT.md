# Coolify Deployment Guide

This guide will help you deploy the Party Room Decorator AI application on Coolify.

## Prerequisites

- A Coolify instance (self-hosted or managed)
- A Google Gemini API key
- Git repository access

## Environment Variables

The application requires the following environment variable:

| Variable Name | Description | Required |
|--------------|-------------|----------|
| `API_KEY` | Your Google Gemini API key | Yes |

### Getting a Google Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Get API Key" or "Create API Key"
4. Copy the generated API key

## Deployment Steps

### 1. Create a New Resource in Coolify

1. Log in to your Coolify dashboard
2. Click on "New Resource"
3. Select "Public Repository" or connect your Git provider

### 2. Configure the Repository

- **Repository URL**: `https://github.com/YOUR_USERNAME/party-decorator.git` (or your repository URL)
- **Branch**: `main` or your preferred branch
- **Build Pack**: Select "Dockerfile" (recommended) or "Nixpacks"

**Important**: This project includes both a `Dockerfile` and `nixpacks.toml`. If you encounter build issues with Nixpacks, switch to Dockerfile in your Coolify settings.

### 3. Build Settings

#### Using Dockerfile (Recommended)

The project includes a `Dockerfile` that handles the build automatically:
- Multi-stage build for optimized image size
- Node.js 20 Alpine base image
- Exposes port 3000
- Automatically runs `npm install`, `npm run build`, and starts the preview server

**Port Configuration**: Set to `3000` in Coolify (or it will auto-detect from Dockerfile)

#### Using Nixpacks (Alternative)

If using Nixpacks, the `nixpacks.toml` configures:
- **Install Command**: `npm install`
- **Build Command**: `npm run build`
- **Start Command**: `npm run preview -- --host 0.0.0.0 --port ${PORT:-3000}`

**Note**: If Nixpacks fails to detect the app type, switch to Dockerfile build pack.

### 4. Environment Variables

In the Coolify environment variables section:

1. Click "Add Environment Variable"
2. Add the following:
   - **Key**: `VITE_API_KEY`
   - **Value**: Your Google Gemini API key (paste the key you obtained earlier)
   - **Is Build Time**: ✓ (CRITICAL - Must be checked! The API key is bundled during build)

**Important**:
- The variable MUST be named `VITE_API_KEY` (Vite requires the `VITE_` prefix for client-side variables)
- The `VITE_API_KEY` must be available at **build time** because Vite bundles it into the JavaScript during the build process
- Make sure "Is Build Time" is checked in Coolify

### 5. Advanced Settings (Optional)

- **Custom Domain**: Configure your custom domain if needed
- **Health Check Path**: `/` (default)
- **Health Check Port**: Same as application port (4173)

### 6. Deploy

1. Click "Save" to save your configuration
2. Click "Deploy" to start the deployment
3. Monitor the build logs for any errors
4. Once deployed, access your application via the provided URL

## Post-Deployment

### Verify the Deployment

1. Visit your deployed application URL
2. Upload a room image
3. Try generating a decorated version
4. Verify the shopping list generation works

### Troubleshooting

#### Build Fails

- Check build logs in Coolify
- Ensure all dependencies are properly listed in `package.json`
- Verify Node.js version compatibility

#### Nixpacks Can't Detect Application Type

If you see "Nixpacks failed to detect the application type":
- Ensure `nixpacks.toml` and `package.json` are in the repository root
- Make sure you're deploying the latest commit (not an old commit)
- Verify the build pack is set to "Nixpacks" in Coolify
- Try triggering a rebuild in Coolify after pushing the latest changes

#### API Key Issues

- Ensure `VITE_API_KEY` is set correctly in environment variables (not `API_KEY`)
- The variable name MUST have the `VITE_` prefix for Vite to expose it to the client
- Verify the API key is valid and has proper permissions
- Check if "Is Build Time" is checked for the environment variable

#### Application Won't Start

- Check the start command is correct
- Verify the port configuration matches
- Review application logs in Coolify

#### Images Not Generating

- Verify the Gemini API key is working
- Check API quota and billing in Google Cloud Console
- Review browser console for errors

## Static File Hosting Alternative

For better performance, you can use a static file server:

### Using Nginx in Coolify

1. Use the Dockerfile approach:

```dockerfile
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

2. Update Port to `80`

## Resources

- [Coolify Documentation](https://coolify.io/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Google Gemini API Documentation](https://ai.google.dev/docs)

## Support

For issues specific to:
- **Application**: Check the GitHub repository issues
- **Coolify**: Visit [Coolify Discord](https://coolify.io/discord)
- **Gemini API**: Check [Google AI Studio Help](https://ai.google.dev/docs)

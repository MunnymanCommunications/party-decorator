<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Party Room Decorator AI

An AI-powered application that helps you visualize party decorations in your room and generates shopping lists for the items you need.

View your app in AI Studio: https://ai.studio/apps/drive/1W5WDzivB8kMPEqngmCyby8AO1Hxw8fZO

## Features

- Upload a photo of your room
- Describe your party theme (Christmas, Halloween, Birthday, etc.)
- AI generates a decorated version of your room
- Automatically creates a shopping list of decorations
- Find products on Amazon with one click
- Mobile-optimized with a beautiful light tan color scheme

## Run Locally

**Prerequisites:** Node.js (v18 or higher)

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```

3. Add your Gemini API key to `.env.local`:
   ```
   VITE_API_KEY=your_gemini_api_key_here
   ```

   Get your API key from: https://makersuite.google.com/app/apikey

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open http://localhost:5173 in your browser

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_API_KEY` | Your Google Gemini API key (VITE_ prefix required) | Yes |

## Deploy to Coolify

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)

Quick steps:
1. Create a new resource in Coolify
2. Connect your Git repository
3. Add environment variable: `VITE_API_KEY=your_gemini_api_key` (check "Is Build Time")
4. Deploy!

## Technology Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Google Gemini AI
- Mobile-optimized responsive design

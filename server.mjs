import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { existsSync, readdirSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

const distPath = path.join(__dirname, 'dist');
const indexPath = path.join(distPath, 'index.html');

// Log paths for debugging
console.log('Server starting...');
console.log('Current directory:', __dirname);
console.log('Dist path:', distPath);
console.log('Index path:', indexPath);
console.log('Dist exists:', existsSync(distPath));
console.log('Index.html exists:', existsSync(indexPath));

if (existsSync(distPath)) {
  console.log('Contents of dist directory:');
  readdirSync(distPath).forEach(file => console.log('  -', file));
}

// Add request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Serve static files from the dist directory with proper MIME types
app.use(express.static(distPath, {
  setHeaders: (res, filePath) => {
    console.log('Serving static file:', filePath);
    if (filePath.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
    } else if (filePath.endsWith('.mjs')) {
      res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
    } else if (filePath.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css; charset=utf-8');
    } else if (filePath.endsWith('.html')) {
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
    }
  },
  index: ['index.html']
}));

// Handle client-side routing - serve index.html for all routes that didn't match static files
app.use((req, res) => {
  console.log('Catch-all middleware triggered for:', req.path);
  if (existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('index.html not found at ' + indexPath);
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
  console.log('Ready to serve requests');
});

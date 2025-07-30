// Simple test server to run Next.js on port 3001
const { createServer } = require('http');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    createServer((req, res) => {
        console.log(`Request: ${req.method} ${req.url}`);
        handle(req, res);
    }).listen(3001, (err) => {
        if (err) throw err;
        console.log('> Ready on http://localhost:3001');
    });
});
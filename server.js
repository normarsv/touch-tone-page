// server.js
const express = require('express');
const next = require('next');
const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handle = app.getRequestHandler();
const port = parseInt(process.env.PORT, 10) || 3002;

app.prepare().then(async () => {
  const server = express();

  /*ALL THE OTHERS URLS*/
  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});

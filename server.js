const express = require('express');
const next = require('next');

const path = require('path');

const port = process.env.NODE_PORT || 3000;
const domain = '0.0.0.0';

const app = next({ dev: false });
const handle = app.getRequestHandler();

const IMAGE_CACHED = 60 * 60 * 1000; //1 hour

app.prepare().then(() => {
  const server = express();

  server.use(express.static(path.join(__dirname, '.next/static')));
  server.use(
    express.static(path.join(__dirname, 'public'), {
      setHeaders: (res) => {
        res.setHeader('Cache-Control', `public, max-age=${IMAGE_CACHED}, immutable`);
      },
    }),
  );
  
  server.get('/api/healthcheck', (req, res) => {
    return res.json({ data: true });
  });

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://${domain}:${port}`);
  });
});

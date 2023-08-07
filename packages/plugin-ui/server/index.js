import dotenv from 'dotenv';
import fs from 'fs';
import https from 'https';
import express from 'express';
import next from 'next';

const hasLocalEnv = fs.existsSync('.env.local');
const envPath = hasLocalEnv ? '.env.local' : '.env.development';

dotenv.config({
  path: envPath,
});

const dev = process.env.NODE_ENV !== 'production';
const useSSL = process.env.USE_SSL === 'true';

const hostname = process.env.HOSTNAME;
const port = process.env.PORT || 443;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

const ssl =
  dev && useSSL
    ? {
        cert: fs.readFileSync(`./cert/cert.pem`),
        key: fs.readFileSync(`./cert/cert.key`),
        requestCert: true,
        rejectUnauthorized: false,
      }
    : null;

app
  .prepare()
  .then(() => {
    const expApp = express();

    expApp.all('*', (req, res) => {
      return handle(req, res);
    });

    if (ssl) {
      const server = https.createServer(ssl, expApp);

      server.listen(port, (err) => {
        if (err) throw err;
        console.log(`> Ready on https://localhost:${port}`);
      });
    } else {
      expApp.listen(port, (err) => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`);
      });
    }
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });

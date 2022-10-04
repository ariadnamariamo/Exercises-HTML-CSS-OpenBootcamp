const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8125;

http
  .createServer((req, res) => {
    console.log(`request ${req.url}`);

    let filePath = `.${req.url}`;
    if (filePath === './14-15 Proyecto final') {
      filePath = './14-15 Proyecto final/html/proyectoFinal.html';
    }

    const extname = String(path.extname(filePath)).toLocaleLowerCase();
    const mimeTypes = {
      '.html': 'text/html',
      '.js': 'text/javascript',
      '.css': 'text/css',
      '.json': 'application/json',
      '.png': 'image/png',
      '.jpg': 'image/jpg',
      '.gif': 'image/gif',
      '.ico': 'image/ico',
      '.svg': 'image/svg+xml',
      '.wav': 'audio/wav',
      '.mp4': 'video/mp4',
      '.woff': 'application/font-woff',
      '.ttf': 'application/font-ttf',
      '.eot': 'application/vnd.ms-fontobject',
      '.otf': 'application/font-otf',
      '.wasm': 'application/wasm',
    };

    const contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, (err, content) => {
      if (err) {
        if (err.code === 'ENOENT') {
          fs.readFile('./404.html', (err, content) => {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end(content, 'utf-8');
          });
        } else {
          res.writeHead(500);
          res.end(`Sorry, check with the site admin for error ${err.code} ..\n`);
        }
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content, 'utf-8');
      }
    });
  })
  .listen(PORT);

console.log(`Server running at http://127.0.0.1:${PORT}`);
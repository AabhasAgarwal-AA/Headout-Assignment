const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {

  const url = new URL(req.url, `http://${req.headers.host}`);
  const fileName = url.searchParams.get('n');
  const lineNumber = url.searchParams.get('m');

  if (fileName && lineNumber) {
    const data = fs.readFileSync(`/tmp/data/${fileName}.txt`, 'utf8');
    const lines = data.split('\n');
    res.end(lines[lineNumber - 1]);

  } else if (fileName) {
    const data = fs.readFileSync(`/tmp/data/${fileName}.txt`, 'utf8');
    res.end(data);

  } else {
    res.statusCode = 400;
    res.end('Invalid request');
  }
});

server.listen(8080, () => {
  console.log('Server running on port 8080');
});
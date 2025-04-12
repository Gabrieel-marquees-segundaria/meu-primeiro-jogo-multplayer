const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;

const server = http.createServer((req, res) => {
  let filePath = path.join(__dirname, "v6", req.url === "/" ? "v6.html" : req.url);

  // Extensão do arquivo
  const ext = path.extname(filePath);

  // Tipos MIME básicos
  const contentTypeMap = {
    ".html": "text/html",
    ".js": "application/javascript",
    ".css": "text/css",
    ".json": "application/json",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".ico": "image/x-icon"
  };

  // Tipo padrão
  const contentType = contentTypeMap[ext] || "application/octet-stream";

  // Verifica se o arquivo existe
  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404);
      res.end("Arquivo não encontrado");
    } else {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
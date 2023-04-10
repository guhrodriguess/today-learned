// Request http
const http = require("http");

// Create server
http
  .createServer((request, response) => {
    response.writeHead(200, { "Content-Type": "application/json" });

    // Routes
    if (request.url === "/product") {
      response.end(
        JSON.stringify({
          message: "Rota de produto",
        })
      );
    }

    if (request.url === "/user") {
      response.end(
        JSON.stringify({
          message: "Rota de usuário",
        })
      );
    }

    response.end(
      JSON.stringify({
        message: "Qualquer outra rota",
      })
    );
  })
  // Port
  .listen(4001, () => console.log("Servidor rodando na porta 4001"));

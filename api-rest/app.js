// Requires
const express = require("express");
const { randomUUID } = require("crypto");
const fs = require("fs");

// App
const app = express();

// Middleware
app.use(express.json());

// Products array
let products = [];

// Read file
fs.readFile("products.json", "utf-8", (err, data) => {
  if (err) {
    console.log(err);
  } else {
    products = JSON.parse(data);
  }
});

// Routes
app.post("/products", (request, response) => {
  // Get body
  const { name, price } = request.body;

  // Create product
  const product = {
    name,
    price,
    id: randomUUID(),
  };

  // Add product to array
  products.push(product);

  // Write file
  productFile();

  // Return response
  return response.json(product);
});

app.get("/products", (request, response) => {
  // Return response
  return response.json(products);
});

app.get("/products/:id", (request, response) => {
  // Get id
  const { id } = request.params;

  // Find product
  const product = products.find((product) => product.id === id);

  // Return response
  return response.json(product);
});

app.put("/products/:id", (request, response) => {
  // Get id
  const { id } = request.params;
  // Get body
  const { name, price } = request.body;

  // Find product
  const productIndex = products.findIndex((product) => product.id === id);
  products[productIndex] = {
    ...products[productIndex],
    name,
    price,
  };

  // Write file
  productFile();

  // Return response
  return response.json({ message: "Produto alterado com sucesso!" });
});

app.delete("/products/:id", (request, response) => {
  // Get id
  const { id } = request.params;

  // Find product
  const productIndex = products.findIndex((product) => product.id === id);

  // Remove product
  products.splice(productIndex, 1);

  // Write file
  productFile();

  // Return response
  return response.json({ message: "Produto removido com sucesso!" });
});

// Function to write file
function productFile() {
  fs.writeFile("products.json", JSON.stringify(products), (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Produto inserido!");
    }
  });
}

// Port
app.listen(4002, () => console.log("Servidor rodando na porta 4002"));

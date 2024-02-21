const express = require("express");
const app = express();

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.get("/oi", function (req, res) {
  res.send("Olá, mundo!");
});

// Lista de personagens
const lista = ["Rich Sanchez", "Morty Smith", "Summer Smith"];

// Read All -> [GET] /item
app.get("/item", function (req, res) {
  res.send(lista);
});

// Read By Id -> [GET] /item/:id
app.get("/item/:id", function (req, res) {
  // Acesso o ID no parametro de rota
  const id = req.params.id;

  // Acesso item na lista baseada no ID recebido
  const item = lista[id];

  // Envio do item recebido com resposta HTTP
  res.send(item);
});

app.listen(3000);

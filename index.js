require("dotenv").config();
const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

const dbUrl = process.env.DATABASE_URL;
const dbName = "Ocean-Jornada-Backend-Fev-2024";

async function main() {
  const client = new MongoClient(dbUrl);

  console.log("Conectando ao banco de dados...");
  await client.connect();
  console.log("Banco de Dados conectado com sucesso!");

  const app = express();

  app.get("/", function (req, res) {
    res.send("Hello World");
  });

  app.get("/oi", function (req, res) {
    res.send("Olá, mundo!");
  });

  // Lista de personagens
  const lista = ["Rich Sanchez", "Morty Smith", "Summer Smith"];

  const db = client.db(dbName);
  const colletcion = db.collection("items");

  // Read All -> [GET] /item
  app.get("/item", async function (req, res) {
    // Realizamos a operacao de find na collection do MongoDB
    const items = await colletcion.find().toArray();

    // Enviando resposta com a lista de items como resposta HTTP
    res.send(items);
  });

  // Read By Id -> [GET] /item/:id
  app.get("/item/:id", async function (req, res) {
    // Acesso o ID no parametro de rota
    const id = req.params.id;

    // Acesso item na collection baseada no ID recebido
    const item = await colletcion.findOne({
      _id: new ObjectId(id),
    });

    // Envio do item recebido com resposta HTTP
    res.send(item);
  });

  // Sinalizamos que o corpo da requisicao sera um JSON
  app.use(express.json());

  // Create -> [POST] /item
  app.post("/item", async function (req, res) {
    // Extraindo o corpo da requisicao
    const item = req.body;

    // Adicionando o item na lista
    await colletcion.insertOne(item);

    // Enviando resposta de sucesso
    res.send(item);
  });

  // Update -> [PUT] /item/:id
  app.put("/item/:id", async function (req, res) {
    // Pegamos o ID recebido pela rota
    const id = req.params.id;

    // Pegamos o novo item do corpo da requisição
    const novoItem = req.body; // Novo item que será atualizado

    // Atualizamos o documento na collection com base no ID
    await colletcion.updateOne(
      { _id: new ObjectId(id) }, // Filtro para encontrar o documento a ser atualizado
      { $set: novoItem } // Novos valores para o documento encontrado
    );

    res.send("Item atualizado com sucesso!");
  });

  // Delete -> [DELETE] /item/:id
  app.delete("/item/:id", async function (req, res) {
    // Pegamos o ID da rota
    const id = req.params.id;

    // Realizamos a operacao de deleteOne
    await colletcion.deleteOne({ _id: new ObjectId(id) });

    // Enviando resposta de sucesso
    res.send("Item deletado com sucesso!");
  });

  app.listen(3000);
}

main();

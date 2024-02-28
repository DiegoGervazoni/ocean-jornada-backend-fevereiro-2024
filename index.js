const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

const dbUrl =
  "mongodb+srv://admin:Rx1x1RUAbGiZZhhG@cluster0.kra5yqd.mongodb.net";
const dbName = "OceanJornadaBackendFev2024";

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
      _id: new ObjectId(id
        )
    });

    // Envio do item recebido com resposta HTTP
    res.send(item);
  });

  // Sinalizamos que o corpo da requisicao sera um JSON
  app.use(express.json());

  // Create -> [POST] /item
  app.post("/item", function (req, res) {
    // Extraindo o corpo da requisicao
    const body = req.body;

    // Acessando o nome do item no corpo da requisicao
    const item = body.nome;

    // Adicionando o item na lista
    lista.push(item);

    // Enviando resposta de sucesso
    res.send("Item adicionado com sucesso");
  });

  app.listen(3000);
}

main();

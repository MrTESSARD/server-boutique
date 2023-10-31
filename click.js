const PORT = 4002;
const express = require("express");
const { readFileSync } = require("fs");
const { createServer } = require("https");
const cors = require("cors");
const router = express();
const mongoDBClient = require("./mongoClient");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schemas/index.js");

router.use(cors());

router.get("/", (req, res) => {
  res.send("Hello Express! 🎉 ");
});

//API Rest
const Product = require("./models/product");
router.get("/products", async (req, res) => {
  const product = await Product.find({});
  try {
    res.send(product);
  } catch (error) {
    res.status(500).send(err);
  }
});
router.get("/products/:category", async (req, res) => {
  const category = req.params.category;
  const product = await Product.find({ category });
  try {
    res.send(product);
  } catch (error) {
    res.status(500).send(err);
  }
});

//GraphQL UI
// http://localhost:4000/graphql
router.use(
  "/graphqlclick",
  cors(), // Ajoutez cette ligne

  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

// Configuration des options HTTPS
const options = {
  key: readFileSync("certLetVPS/VPS_LC2/privkey.pem"),
  cert: readFileSync("certLetVPS/VPS_LC2/fullchain.pem"),
};

// Création du serveur HTTPS
const server = createServer(options, router);

// Démarrage du serveur HTTPS sur le port 8443
server.listen(PORT, () => {
  console.log(`Le serveur est en écoute sur le port ${PORT} en mode HTTPS.`);
  mongoDBClient.initialize();
});

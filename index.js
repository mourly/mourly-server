const { createServer } = require("http");
const express = require("express");
require("dotenv").config();

const routes = require("./src/routes");
const { connectDB, syncDB } = require("./src/config/database");

const app = express();
const server = createServer(app);
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

(async () => {
  await connectDB();
  await syncDB();
})();

app.use("/", routes);

server.listen(port, () =>
  console.log(`Sunucu ${port} portundan dinleniyor...`)
);

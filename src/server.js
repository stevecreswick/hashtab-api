const express = require("express");
const app = express();
const awsServerlessExpress = require("aws-serverless-express");

app.get("/", (req, res) => res.send("Hello Steve!"));

const server = awsServerlessExpress.createServer(app);

module.exports.handler = (event, context) => {
  awsServerlessExpress.proxy(server, event, context);
};

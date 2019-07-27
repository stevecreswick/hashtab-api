import "@babel/polyfill";
import express from "express";
import awsServerlessExpress from "aws-serverless-express";
import awsServerlessExpressMiddleware from "aws-serverless-express/middleware";
import api from "./api/index";
import bodyParser from "body-parser";

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(awsServerlessExpressMiddleware.eventContext());

app.use("/api", api);

const server = awsServerlessExpress.createServer(app);

const handler = (event, context) => {
  console.log("Steve is here");

  try {
    awsServerlessExpress.proxy(server, event, context);
  } catch (e) {
    console.log(e);
  }
};

export { handler };

import AWS from "aws-sdk";
import { promisify } from "util";
import environment from "../utils/env";

// Setup DynamoDB for Local Dev
let config = {};
if (environment.isLocal()) {
  config = {
    region: "localhost",
    endpoint: "http://localhost:8000"
  };
}

const ddb = new AWS.DynamoDB(config);

const putItem = promisify(ddb.putItem).bind(ddb);
const query = promisify(ddb.query).bind(ddb);

class BaseModel {
  static async findByPK(pk) {
    const params = {
      TableName: "TabsTable",
      KeyConditionExpression: "pk = :pk",
      ExpressionAttributeValues: {
        ":pk": {
          S: pk
        }
      }
    };

    const item = await query(params);

    return item;
  }

  static async create(params) {
    const item = await putItem(params);

    return item;
  }

  static asJSON(item) {
    console.log(item);

    return item;
  }
}

export default BaseModel;

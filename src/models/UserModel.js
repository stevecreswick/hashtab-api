import BaseModel from "./BaseModel";
import timestamp from "../utils/timestamp";

const PARTITION_KEY = "pk";
const SORT_KEY = "sk";

const USER_PROFILE_KEY = "profile";
const VALID_FIELDS = ["email", "location", "display"];

export default class UserModel extends BaseModel {
  static async create(options = {}) {
    const { user_id: userId } = options;

    const Item = {
      [PARTITION_KEY]: {
        S: userId
      },
      [SORT_KEY]: {
        S: USER_PROFILE_KEY
      },
      // @todo: add created in BaseModel and include on everything
      created: {
        S: timestamp()
      }
    };

    // Validate options using field above...find a better way to do this
    const validOptions = Object.keys(options).filter(option =>
      VALID_FIELDS.includes(option)
    );

    validOptions.forEach(option => {
      if (option !== "user_id") {
        Item[option] = {
          S: options[option]
        };
      }
    });

    // Just formatting here, all AWS stuff should be done in BaseModel
    const params = {
      Item,
      ReturnConsumedCapacity: "TOTAL",
      TableName: "TabsTable"
    };

    await super.create(params);

    return Item;
  }
}

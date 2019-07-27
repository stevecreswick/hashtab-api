import BaseModel from "./BaseModel";
import timestamp from "../utils/timestamp";

export default class TabModel extends BaseModel {
  static async create(options = {}) {
    const { url, category, user_id: userId } = options;
    const created = timestamp();

    const pk = `${userId}`;
    const sk = `${category}#${url}`;
    const gsOnePk = `${category}`;
    const gsOneSk = `${created}#${userId}`;
    const gsTwoPk = `${url}`;
    const gsTwoSk = `${created}#${userId}`;

    const Item = {
      pk: {
        S: pk
      },
      sk: {
        S: sk
      },
      gsi1_pk: {
        S: gsOnePk
      },
      gsi1_sk: {
        S: gsOneSk
      },
      gsi2_pk: {
        S: gsTwoPk
      },
      gsi2_sk: {
        S: gsTwoSk
      }
    };

    // Just formatting here, all AWS stuff should be done in BaseModel
    const params = {
      Item,
      ReturnConsumedCapacity: "TOTAL",
      TableName: "TabsTable",
      ReturnValues: "ALL_OLD"
    };

    await super.create(params);

    return Item;
  }
}

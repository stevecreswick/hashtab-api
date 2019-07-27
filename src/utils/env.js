import dotenv from "dotenv";
import { get } from "lodash";

dotenv.config();

class Env {
  constructor(env) {
    this._env = env;
  }

  get(name) {
    return get(this._env, name);
  }

  isLocal() {
    return this.get("env.stage") === "local";
  }
}

const environment = new Env({
  env: {
    stage: process.env.STAGE
  }
});

export default environment;

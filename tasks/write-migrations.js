const yaml = require("js-yaml");
const fs = require("fs");
const path = require("path");

try {
  const obj = yaml.safeLoad(
    fs.readFileSync(`${__dirname}/../serverless.yml`, "utf8")
  );

  // Horribly unreadable for laughs
  const {
    resources: { Resources: resources }
  } = obj;

  const { TabsTable } = resources;

  console.log({ TabsTable });

  fs.writeFileSync(
    path.resolve(process.cwd(), ".migrations", "dynamodb.json"),
    JSON.stringify({ Tabel: { TabsTable } }, null, 2)
  );
} catch (e) {
  console.log(e);
}

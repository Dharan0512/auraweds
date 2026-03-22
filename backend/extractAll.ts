import { sequelize } from "./src/models/sequelize";
import { connectPostgres } from "./src/config/db.postgres";
import * as fs from "fs";
import * as path from "path";

async function run() {
  await connectPostgres();

  const seedDir = path.join(__dirname, "seeds");
  if (!fs.existsSync(seedDir)) {
    fs.mkdirSync(seedDir);
  }

  // Get all models registered in Sequelize
  const models = sequelize.models;

  for (const modelName of Object.keys(models)) {
    console.log(`Extracting ${modelName}...`);
    const model = models[modelName];
    // Exclude timestamps to prevent conflicts on insertion
    const data = await model.findAll({ raw: true, attributes: { exclude: ['createdAt', 'updatedAt'] } });
    fs.writeFileSync(path.join(seedDir, `${modelName}.json`), JSON.stringify(data, null, 2));
    console.log(`Saved ${data.length} records for ${modelName}.`);
  }

  console.log("Full DB Extraction Complete!");
  process.exit(0);
}

run();

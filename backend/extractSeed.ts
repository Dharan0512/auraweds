import { 
  Country, MotherTongue, Religion, Caste, Height, Plan, Star, Gothram, Laknam, Rasi 
} from "./src/models/sequelize";
import { connectPostgres } from "./src/config/db.postgres";
import * as fs from "fs";

async function run() {
  await connectPostgres();

  const countries = await Country.findAll({ raw: true, attributes: { exclude: ['createdAt', 'updatedAt'] } });
  const motherTongues = await MotherTongue.findAll({ raw: true, attributes: { exclude: ['createdAt', 'updatedAt'] } });
  const religions = await Religion.findAll({ raw: true, attributes: { exclude: ['createdAt', 'updatedAt'] } });
  const castes = await Caste.findAll({ raw: true, attributes: { exclude: ['createdAt', 'updatedAt'] } });
  const plans = await Plan.findAll({ raw: true, attributes: { exclude: ['createdAt', 'updatedAt'] } });
  const stars = await Star.findAll({ raw: true, attributes: { exclude: ['createdAt', 'updatedAt'] } });
  const gothrams = await Gothram.findAll({ raw: true, attributes: { exclude: ['createdAt', 'updatedAt'] } });
  const laknams = await Laknam.findAll({ raw: true, attributes: { exclude: ['createdAt', 'updatedAt'] } });
  const rasis = await Rasi.findAll({ raw: true, attributes: { exclude: ['createdAt', 'updatedAt'] } });

  const data = {
    countries,
    motherTongues,
    religions,
    castes,
    plans,
    stars,
    gothrams,
    laknams,
    rasis
  };

  fs.writeFileSync("extractedData.json", JSON.stringify(data, null, 2));
  console.log("Extraction Done!");
  process.exit(0);
}

run();

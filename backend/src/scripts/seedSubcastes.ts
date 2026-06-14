/**
 * Seeds the `subcastes` table with a handful of sub-communities for each
 * existing caste. Idempotent: skips any (casteId, name) pair that already exists.
 *
 * Run with:  npx ts-node src/scripts/seedSubcastes.ts
 */
import { sequelize, Caste, Subcaste } from "../models/sequelize";

// Sub-communities keyed by the caste name as stored in the DB.
const SUBCASTES_BY_CASTE: Record<string, string[]> = {
  Sunni: ["Hanafi", "Shafi", "Maliki", "Hanbali", "Barelvi", "Deobandi"],
  Shia: ["Ithna Ashari", "Ismaili", "Zaidi", "Bohra"],
  "Sunni Hanafi": ["Barelvi", "Deobandi", "Ahle Sunnat"],
  "Sunni Shafi": ["Kerala Shafi", "Coastal Shafi", "Traditional Shafi"],
  Syed: ["Syed Shah", "Syed Bukhari", "Syed Naqvi", "Syed Zaidi", "Syed Rizvi"],
  Sheikh: ["Siddiqui", "Farooqui", "Usmani", "Abbasi", "Quraishi"],
  Pathan: ["Yusufzai", "Afridi", "Khattak", "Lodhi", "Durrani", "Ghori"],
  Mughal: ["Chughtai", "Barlas", "Timuri", "Uzbek"],
  Ansari: ["Momin Ansari", "Julaha Ansari", "Ansari Sheikh"],
  Qureshi: ["Qureshi Hashmi", "Qureshi Chishti", "Qassab Qureshi"],
  Memon: ["Kutchi Memon", "Halai Memon", "Sindhi Memon", "Okhai Memon"],
  Labbai: ["Marakkayar", "Kayalar", "Rowther Labbai"],
  Rowther: ["Tamil Rowther", "Kerala Rowther", "Marakkayar Rowther"],
  "Dawoodi Bohra": ["Sulaymani Bohra", "Alavi Bohra", "Patani Bohra"],
  "Shia Bohra": ["Dawoodi", "Sulaymani", "Alavi"],
  Ismaili: ["Nizari Ismaili", "Mustaali Ismaili", "Khoja Ismaili"],
  "Ahle Hadith": ["Salafi", "Ghair Muqallid"],
  Other: ["Not Specified", "Prefer Not to Say"],
};

// Fallback used for any caste not present in the map above.
const GENERIC_SUBCASTES = ["Traditional", "Reformed", "Other"];

const seedSubcastes = async () => {
  try {
    await sequelize.authenticate();
    const castes = await Caste.findAll();
    let created = 0;
    let skipped = 0;

    for (const caste of castes) {
      const names = SUBCASTES_BY_CASTE[caste.name] || GENERIC_SUBCASTES;
      for (const name of names) {
        const [, wasCreated] = await Subcaste.findOrCreate({
          where: { casteId: caste.id, name },
          defaults: { casteId: caste.id, name, isActive: true },
        });
        if (wasCreated) created++;
        else skipped++;
      }
    }

    console.log(
      `[SUBCASTE SEEDER] Done. Created ${created}, skipped ${skipped} (already existed).`,
    );
    process.exit(0);
  } catch (error) {
    console.error("[SUBCASTE SEEDER] Error:", error);
    process.exit(1);
  }
};

seedSubcastes();

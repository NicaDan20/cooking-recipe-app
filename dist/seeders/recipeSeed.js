"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recipeSeedDatabase = void 0;
const Recipe_1 = require("../schema/Recipe");
const database_1 = require("../functions/database");
const csv_parse_1 = require("../functions/csv_parse");
const CSV_FILES_TO_PARSE = 59;
async function recipeSeedDatabase() {
    try {
        (0, database_1.connectToDb)();
        if (await Recipe_1.RecipeModel.count() !== 0) {
            console.log("Database already seeded");
            (0, database_1.closeDbConnection)();
            return;
        }
        await Recipe_1.RecipeModel.collection.drop();
        console.log("Beginning Seeding");
        for (let i = 1; i <= CSV_FILES_TO_PARSE; i++) {
            let csvFilePath = `./dataset/recipes-${i}.csv`;
            const seedRecipes = await (0, csv_parse_1.parseCsv)(csvFilePath);
            await Recipe_1.RecipeModel.insertMany(seedRecipes);
            console.log(`Done with file ${i}`);
        }
        console.log("Seeded Database");
        (0, database_1.closeDbConnection)();
    }
    catch (err) {
        console.log(err);
    }
}
exports.recipeSeedDatabase = recipeSeedDatabase;

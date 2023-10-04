import {RecipeModel} from "../schema/Recipe";
import { closeDbConnection, connectToDb } from "../functions/database";
import {parseCsv, Recipe} from '../functions/csv_parse';

const CSV_FILES_TO_PARSE = 59;

export async function recipeSeedDatabase() {
    try {
        connectToDb();
        if (await RecipeModel.count() !== 0) {console.log("Database already seeded"); closeDbConnection(); return;}
        await RecipeModel.collection.drop();
        console.log("Beginning Seeding")
        for (let i=1;i<=CSV_FILES_TO_PARSE;i++) {
            let csvFilePath: string = `./dataset/recipes-${i}.csv`
            const seedRecipes: Recipe[] = await parseCsv(csvFilePath);
            await RecipeModel.insertMany(seedRecipes)
            console.log(`Done with file ${i}`) 
        }

        console.log("Seeded Database")
        closeDbConnection()   
    } catch (err) {
        console.log(err)
    }
}   
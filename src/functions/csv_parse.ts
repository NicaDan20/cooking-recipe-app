import csv from "csvtojson"

export type Recipe = {
    [key: string] : string | number | string[];
    RecipeId: number;
    Name: string;
    CookTime: string;
    PrepTime: string;
    TotalTime: string;
    Images: string[] | string;
    RecipeCategory: string;
    Keywords: string[] | string;
    RecipeIngredientQuantities: string[] | string;
    RecipeIngredientParts: string[] | string ;
    Calories: number;
    FatContent: number;
    SaturatedFatContent: number;
    CholesterolContent: number;
    SodiumContent: number;
    CarbohydrateContent: number;
    FiberContent: number;
    SugarContent: number;
    ProteinContent: number;
    RecipeServings: string;
    RecipeInstructions: string;
}

// csv({
//      colParser: {
//          "AuthorName": "omit",
//          "AuthorId": "omit",
//          "DatePublished": "omit",
//          "AggregatedRating": "omit",
//          "Description": "omit",
//          "ReviewCount": "omit"
//      },
//     checkType:true,
//     noheader: false,
// })
//     .fromFile(csvFilePath)
//     // .then((jsonRecipes: Recipe[])=> {
//     //     parseRecipesJSONList(jsonRecipes)
//     //     return jsonRecipes;
//     // })

export const parseCsv = async(csvFilePath: string) => {
    const jsonArray: Recipe[] = await csv({
        colParser: {
            "AuthorName": "omit",
            "AuthorId": "omit",
            "DatePublished": "omit",
            "AggregatedRating": "omit",
            "Description": "omit",
            "ReviewCount": "omit"
        },
       checkType:true,
       noheader: false,
    }).fromFile(csvFilePath);
    parseRecipesJSONList(jsonArray)
    return jsonArray;
}

function parseJsonStringRowAsArray(row: string | string[] | number) : string[] | number {
    if (typeof row !== "string") {return row; }
    return row.replace("c(", "").replace("\")", "").replace(/['"]+/g, '').split(', ');
}


function parseRecipesJSONList(recipes: Recipe[]) {
    let keyarray = ['Images', 'Keywords', 'RecipeIngredientQuantities', 'RecipeIngredientParts'] 
    for (let i=0;i<recipes.length; i++) {
        for (let k=0; k<keyarray.length; k++) {
            const key = keyarray[k] as keyof Recipe;
            recipes[i][key] = parseJsonStringRowAsArray(recipes[i][key]);
        }
        recipes[i].RecipeInstructions = recipes[i].RecipeInstructions.replace("c(", "").replace("\")", "").replace(/['"]+/g, '')
    }
}


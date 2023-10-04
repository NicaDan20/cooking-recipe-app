"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseCsv = void 0;
const csvtojson_1 = __importDefault(require("csvtojson"));
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
const parseCsv = async (csvFilePath) => {
    const jsonArray = await (0, csvtojson_1.default)({
        colParser: {
            "AuthorName": "omit",
            "AuthorId": "omit",
            "DatePublished": "omit",
            "AggregatedRating": "omit",
            "Description": "omit",
            "ReviewCount": "omit"
        },
        checkType: true,
        noheader: false,
    }).fromFile(csvFilePath);
    parseRecipesJSONList(jsonArray);
    return jsonArray;
};
exports.parseCsv = parseCsv;
function parseJsonStringRowAsArray(row) {
    if (typeof row !== "string") {
        return row;
    }
    return row.replace("c(", "").replace("\")", "").replace(/['"]+/g, '').split(', ');
}
function parseRecipesJSONList(recipes) {
    let keyarray = ['Images', 'Keywords', 'RecipeIngredientQuantities', 'RecipeIngredientParts'];
    for (let i = 0; i < recipes.length; i++) {
        for (let k = 0; k < keyarray.length; k++) {
            const key = keyarray[k];
            recipes[i][key] = parseJsonStringRowAsArray(recipes[i][key]);
        }
        recipes[i].RecipeInstructions = recipes[i].RecipeInstructions.replace("c(", "").replace("\")", "").replace(/['"]+/g, '');
    }
}

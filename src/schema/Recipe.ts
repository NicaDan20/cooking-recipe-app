import mongoose from "mongoose";
import slugify from "slugify";
import {generateRandomIntegerInRange} from "../functions/random_number_generator";

const recipeSchema = new mongoose.Schema({
    RecipeId: {
        type: Number,
        required: true
    },
    Name: {
        type: String,
        required: true
    },
    CookTime: {
        type: String,
    },
    PrepTime: {
        type: String,
    },
    TotalTime: {
        type: String,
    },
    Images: {
        type: [String]
    },
    RecipeCategory: {
        type: String,
    },
    Keywords: {
        type: [String]
    },
    RecipeIngredientQuantities: {
        type: [String],
    },
    RecipeIngredientParts: {
        type: [String],
    },
    Calories: {
        type: Number
    },
    FatContent: {
        type: Number
    },
    SaturatedFatContent: {
        type: Number
    },
    CholesterolContent: {
        type: Number
    },
    SodiumContent: {
        type: Number
    },
    CarbohydrateContent: {
        type: Number
    },
    FiberContent: {
        type: Number
    },
    SugarContent: {
        type: Number
    },
    ProteinContent: {
        type: Number
    },
    RecipeServings: {
        type: String
    },
    RecipeYield: {
        type: String
    },
    RecipeInstructions: {
        type: String,
    },
    Slug: {
        type: String,
        required: true,
        unique: true
    }
})

recipeSchema.pre('validate', function(next) {
    if(this.Name) {
        this.Slug = slugify(this.Name, {lower: true, strict: true, remove: /[*+~.()'"!:@]/g}).concat(`-${generateRandomIntegerInRange(1, 100000000).toString()}`)
    }
    next()
})

export const RecipeModel = mongoose.model("Recipe", recipeSchema)
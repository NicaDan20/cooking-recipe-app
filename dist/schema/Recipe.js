"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const slugify_1 = __importDefault(require("slugify"));
const random_number_generator_1 = require("../functions/random_number_generator");
const recipeSchema = new mongoose_1.default.Schema({
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
});
recipeSchema.pre('validate', function (next) {
    if (this.Name) {
        this.Slug = (0, slugify_1.default)(this.Name, { lower: true, strict: true, remove: /[*+~.()'"!:@]/g }).concat(`-${(0, random_number_generator_1.generateRandomIntegerInRange)(1, 100000000).toString()}`);
    }
    next();
});
exports.RecipeModel = mongoose_1.default.model("Recipe", recipeSchema);

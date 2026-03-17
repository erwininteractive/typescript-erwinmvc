"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateModel = generateModel;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const ejs_1 = __importDefault(require("ejs"));
const child_process_1 = require("child_process");
const paths_1 = require("./paths");
/**
 * Generate a Prisma model and append it to schema.prisma.
 */
async function generateModel(name, options = {}) {
    const modelName = capitalize(name);
    const tableName = pluralize(name.toLowerCase());
    console.log(`Generating model: ${modelName}`);
    // Find prisma schema
    const schemaPath = path_1.default.resolve("prisma/schema.prisma");
    if (!fs_1.default.existsSync(schemaPath)) {
        throw new Error("prisma/schema.prisma not found. Are you in a project directory?");
    }
    // Load and render template
    const templatePath = path_1.default.join((0, paths_1.getTemplatesDir)(), "model.prisma.ejs");
    if (!fs_1.default.existsSync(templatePath)) {
        throw new Error("Model template not found");
    }
    const template = fs_1.default.readFileSync(templatePath, "utf-8");
    const modelContent = ejs_1.default.render(template, { modelName, tableName });
    // Check if model already exists
    const existingSchema = fs_1.default.readFileSync(schemaPath, "utf-8");
    if (existingSchema.includes(`model ${modelName} {`)) {
        throw new Error(`Model ${modelName} already exists in schema.prisma`);
    }
    // Append model to schema
    fs_1.default.appendFileSync(schemaPath, "\n" + modelContent);
    console.log(`Added model ${modelName} to prisma/schema.prisma`);
    // Run Prisma migrate
    if (!options.skipMigrate) {
        console.log("\nRunning Prisma migrate...");
        try {
            (0, child_process_1.execSync)(`npx prisma migrate dev --name add-${name.toLowerCase()}`, {
                stdio: "inherit",
            });
        }
        catch {
            console.error("Migration failed. You may need to run it manually.");
        }
        console.log("\nGenerating Prisma client...");
        try {
            (0, child_process_1.execSync)("npx prisma generate", { stdio: "inherit" });
        }
        catch {
            console.error("Failed to generate Prisma client.");
        }
    }
    console.log(`\nModel ${modelName} created successfully!`);
}
/**
 * Capitalize the first letter of a string.
 */
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
/**
 * Simple pluralization - add 's' if not already ending in 's'.
 */
function pluralize(str) {
    if (str.endsWith("s")) {
        return str;
    }
    if (str.endsWith("y")) {
        return str.slice(0, -1) + "ies";
    }
    return str + "s";
}

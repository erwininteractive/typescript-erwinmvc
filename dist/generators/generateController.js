"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateController = generateController;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const ejs_1 = __importDefault(require("ejs"));
const paths_1 = require("./paths");
/**
 * Generate a CRUD controller.
 */
async function generateController(name, options = {}) {
    const { views = true } = options;
    const modelName = capitalize(name);
    const lowerModelName = name.toLowerCase();
    const controllerName = `${modelName}Controller`;
    const resourcePath = pluralize(lowerModelName);
    console.log(`Generating controller: ${controllerName}`);
    // Ensure controllers directory exists
    const controllersDir = path_1.default.resolve("src/controllers");
    if (!fs_1.default.existsSync(controllersDir)) {
        fs_1.default.mkdirSync(controllersDir, { recursive: true });
    }
    // Load and render controller template
    const templatePath = path_1.default.join((0, paths_1.getTemplatesDir)(), "controller.ts.ejs");
    if (!fs_1.default.existsSync(templatePath)) {
        throw new Error("Controller template not found");
    }
    const template = fs_1.default.readFileSync(templatePath, "utf-8");
    const controllerContent = ejs_1.default.render(template, {
        modelName,
        lowerModelName,
        controllerName,
        resourcePath,
    });
    // Write controller file
    const controllerPath = path_1.default.join(controllersDir, `${controllerName}.ts`);
    if (fs_1.default.existsSync(controllerPath)) {
        throw new Error(`Controller ${controllerName}.ts already exists`);
    }
    fs_1.default.writeFileSync(controllerPath, controllerContent);
    console.log(`Created src/controllers/${controllerName}.ts`);
    // Generate views if enabled
    if (views) {
        await generateViews(lowerModelName, modelName);
    }
    console.log(`
Controller ${controllerName} created successfully!

Routes:
  GET    /${resourcePath}       -> index
  GET    /${resourcePath}/:id   -> show
  POST   /${resourcePath}       -> store
  PUT    /${resourcePath}/:id   -> update
  DELETE /${resourcePath}/:id   -> destroy
`);
}
/**
 * Generate basic views for a resource.
 */
async function generateViews(lowerName, modelName) {
    const viewsDir = path_1.default.resolve(`src/views/${lowerName}`);
    if (!fs_1.default.existsSync(viewsDir)) {
        fs_1.default.mkdirSync(viewsDir, { recursive: true });
    }
    // Load view template
    const viewTemplatePath = path_1.default.join((0, paths_1.getTemplatesDir)(), "view.ejs.ejs");
    if (!fs_1.default.existsSync(viewTemplatePath)) {
        console.warn("View template not found, skipping view generation");
        return;
    }
    const viewTemplate = fs_1.default.readFileSync(viewTemplatePath, "utf-8");
    // Generate index view
    const indexContent = ejs_1.default.render(viewTemplate, {
        title: `${modelName} List`,
        modelName,
        lowerName,
        viewType: "index",
    });
    fs_1.default.writeFileSync(path_1.default.join(viewsDir, "index.ejs"), indexContent);
    // Generate show view
    const showContent = ejs_1.default.render(viewTemplate, {
        title: `${modelName} Details`,
        modelName,
        lowerName,
        viewType: "show",
    });
    fs_1.default.writeFileSync(path_1.default.join(viewsDir, "show.ejs"), showContent);
    console.log(`Created views in src/views/${lowerName}/`);
}
/**
 * Capitalize the first letter of a string.
 */
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
/**
 * Simple pluralization.
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

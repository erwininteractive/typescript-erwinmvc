"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateResource = generateResource;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const ejs_1 = __importDefault(require("ejs"));
const child_process_1 = require("child_process");
const paths_1 = require("./paths");
const utils_1 = require("./utils");
/**
 * Generate a complete resource: model + controller + views.
 */
async function generateResource(name, options = {}) {
    const modelName = (0, utils_1.capitalize)(name);
    const lowerModelName = name.toLowerCase();
    const controllerName = `${modelName}Controller`;
    const resourcePath = (0, utils_1.pluralize)(lowerModelName);
    const tableName = (0, utils_1.pluralize)(lowerModelName);
    console.log(`\nGenerating resource: ${modelName}\n`);
    // Generate model (if database is set up)
    if (!options.skipModel) {
        const schemaPath = path_1.default.resolve("prisma/schema.prisma");
        if (fs_1.default.existsSync(schemaPath)) {
            await generateModel(modelName, tableName, schemaPath, options.skipMigrate);
        }
        else {
            console.log("Skipping model (no prisma/schema.prisma found)");
            console.log("Run 'npm run db:setup' first to enable database features\n");
        }
    }
    // Generate controller
    if (!options.skipController) {
        await generateController(modelName, lowerModelName, controllerName, resourcePath, options.apiOnly);
    }
    // Generate views (unless API only)
    if (!options.skipViews && !options.apiOnly) {
        await generateViews(modelName, lowerModelName, resourcePath);
    }
    // Print summary
    printSummary(modelName, controllerName, resourcePath, options);
}
/**
 * Generate Prisma model.
 */
async function generateModel(modelName, tableName, schemaPath, skipMigrate) {
    const templatePath = path_1.default.join((0, paths_1.getTemplatesDir)(), "model.prisma.ejs");
    if (!fs_1.default.existsSync(templatePath)) {
        throw new Error("Model template not found");
    }
    // Check if model already exists
    const existingSchema = fs_1.default.readFileSync(schemaPath, "utf-8");
    if (existingSchema.includes(`model ${modelName} {`)) {
        console.log(`Model ${modelName} already exists, skipping...`);
        return;
    }
    const template = fs_1.default.readFileSync(templatePath, "utf-8");
    const modelContent = ejs_1.default.render(template, { modelName, tableName });
    fs_1.default.appendFileSync(schemaPath, "\n" + modelContent);
    console.log(`Created model ${modelName} in prisma/schema.prisma`);
    if (!skipMigrate) {
        console.log("\nRunning Prisma migrate...");
        try {
            (0, child_process_1.execSync)(`npx prisma migrate dev --name add-${tableName}`, {
                stdio: "inherit",
            });
            (0, child_process_1.execSync)("npx prisma generate", { stdio: "inherit" });
        }
        catch {
            console.error("Migration failed. Run manually: npx prisma migrate dev");
        }
    }
}
/**
 * Generate controller file.
 */
async function generateController(modelName, lowerModelName, controllerName, resourcePath, apiOnly) {
    const controllersDir = path_1.default.resolve("src/controllers");
    if (!fs_1.default.existsSync(controllersDir)) {
        fs_1.default.mkdirSync(controllersDir, { recursive: true });
    }
    const controllerPath = path_1.default.join(controllersDir, `${controllerName}.ts`);
    if (fs_1.default.existsSync(controllerPath)) {
        console.log(`Controller ${controllerName}.ts already exists, skipping...`);
        return;
    }
    // Use resource controller template (with full CRUD + form handling)
    const templateName = apiOnly ? "controller.api.ts.ejs" : "controller.resource.ts.ejs";
    let templatePath = path_1.default.join((0, paths_1.getTemplatesDir)(), templateName);
    // Fall back to basic controller template if resource template doesn't exist
    if (!fs_1.default.existsSync(templatePath)) {
        templatePath = path_1.default.join((0, paths_1.getTemplatesDir)(), "controller.ts.ejs");
    }
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
    fs_1.default.writeFileSync(controllerPath, controllerContent);
    console.log(`Created src/controllers/${controllerName}.ts`);
}
/**
 * Generate view files for the resource.
 */
async function generateViews(modelName, lowerModelName, resourcePath) {
    const viewsDir = path_1.default.resolve(`src/views/${resourcePath}`);
    if (!fs_1.default.existsSync(viewsDir)) {
        fs_1.default.mkdirSync(viewsDir, { recursive: true });
    }
    const views = [
        { name: "index", title: `${modelName} List` },
        { name: "show", title: `${modelName} Details` },
        { name: "create", title: `Create ${modelName}` },
        { name: "edit", title: `Edit ${modelName}` },
    ];
    for (const view of views) {
        const viewPath = path_1.default.join(viewsDir, `${view.name}.ejs`);
        if (fs_1.default.existsSync(viewPath)) {
            console.log(`View ${view.name}.ejs already exists, skipping...`);
            continue;
        }
        // Try specific template first, then fall back to generic
        let templatePath = path_1.default.join((0, paths_1.getTemplatesDir)(), `views/${view.name}.ejs.ejs`);
        if (!fs_1.default.existsSync(templatePath)) {
            templatePath = path_1.default.join((0, paths_1.getTemplatesDir)(), "view.ejs.ejs");
        }
        if (!fs_1.default.existsSync(templatePath)) {
            console.warn(`View template for ${view.name} not found, skipping...`);
            continue;
        }
        const template = fs_1.default.readFileSync(templatePath, "utf-8");
        const viewContent = ejs_1.default.render(template, {
            title: view.title,
            modelName,
            lowerName: lowerModelName,
            resourcePath,
            viewType: view.name,
        });
        fs_1.default.writeFileSync(viewPath, viewContent);
    }
    console.log(`Created views in src/views/${resourcePath}/`);
}
/**
 * Print summary of generated files and next steps.
 */
function printSummary(modelName, controllerName, resourcePath, options) {
    console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Resource ${modelName} created successfully!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Files created:`);
    if (!options.skipModel) {
        console.log(`  prisma/schema.prisma  (${modelName} model added)`);
    }
    if (!options.skipController) {
        console.log(`  src/controllers/${controllerName}.ts`);
    }
    if (!options.skipViews && !options.apiOnly) {
        console.log(`  src/views/${resourcePath}/index.ejs`);
        console.log(`  src/views/${resourcePath}/show.ejs`);
        console.log(`  src/views/${resourcePath}/create.ejs`);
        console.log(`  src/views/${resourcePath}/edit.ejs`);
    }
    console.log(`
Routes:
  GET    /${resourcePath}           → List all ${resourcePath}
  GET    /${resourcePath}/create    → Show create form
  POST   /${resourcePath}           → Create new ${modelName.toLowerCase()}
  GET    /${resourcePath}/:id       → Show ${modelName.toLowerCase()}
  GET    /${resourcePath}/:id/edit  → Show edit form
  PUT    /${resourcePath}/:id       → Update ${modelName.toLowerCase()}
  DELETE /${resourcePath}/:id       → Delete ${modelName.toLowerCase()}

Next steps:
  1. Add routes to src/server.ts:

     import * as ${controllerName} from "./controllers/${controllerName}";
     
     app.get("/${resourcePath}", ${controllerName}.index);
     app.get("/${resourcePath}/create", ${controllerName}.create);
     app.post("/${resourcePath}", ${controllerName}.store);
     app.get("/${resourcePath}/:id", ${controllerName}.show);
     app.get("/${resourcePath}/:id/edit", ${controllerName}.edit);
     app.put("/${resourcePath}/:id", ${controllerName}.update);
     app.delete("/${resourcePath}/:id", ${controllerName}.destroy);

  2. Edit the model in prisma/schema.prisma to add your fields
  3. Run: npx prisma migrate dev --name add-${resourcePath}-fields
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);
}

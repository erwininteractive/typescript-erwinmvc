#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const initApp_1 = require("./generators/initApp");
const generateModel_1 = require("./generators/generateModel");
const generateController_1 = require("./generators/generateController");
const generateResource_1 = require("./generators/generateResource");
const program = new commander_1.Command();
program
    .name("erwinmvc")
    .description("CLI for @erwininteractive/mvc framework")
    .version("0.2.0");
// Init command - scaffold a new application
program
    .command("init <dir>")
    .description("Scaffold a new MVC application")
    .option("--skip-install", "Skip npm install")
    .option("--with-database", "Include database/Prisma setup")
    .option("--with-ci", "Include GitHub Actions CI workflow")
    .action(async (dir, options) => {
    try {
        await (0, initApp_1.initApp)(dir, options);
    }
    catch (err) {
        console.error("Error:", err instanceof Error ? err.message : err);
        process.exit(1);
    }
});
// Generate command group
const generate = program
    .command("generate")
    .alias("g")
    .description("Generate models, controllers, or resources");
// Generate model
generate
    .command("model <name>")
    .description("Generate a Prisma model")
    .option("--skip-migrate", "Skip running Prisma migrate")
    .action(async (name, options) => {
    try {
        await (0, generateModel_1.generateModel)(name, options);
    }
    catch (err) {
        console.error("Error:", err instanceof Error ? err.message : err);
        process.exit(1);
    }
});
// Generate controller
generate
    .command("controller <name>")
    .description("Generate a CRUD controller")
    .option("--no-views", "Skip generating views")
    .action(async (name, options) => {
    try {
        await (0, generateController_1.generateController)(name, options);
    }
    catch (err) {
        console.error("Error:", err instanceof Error ? err.message : err);
        process.exit(1);
    }
});
// Generate resource (model + controller + views)
generate
    .command("resource <name>")
    .description("Generate a complete resource (model + controller + views)")
    .option("--skip-model", "Skip generating Prisma model")
    .option("--skip-controller", "Skip generating controller")
    .option("--skip-views", "Skip generating views")
    .option("--skip-migrate", "Skip running Prisma migrate")
    .option("--api-only", "Generate API-only controller (no views)")
    .action(async (name, options) => {
    try {
        await (0, generateResource_1.generateResource)(name, options);
    }
    catch (err) {
        console.error("Error:", err instanceof Error ? err.message : err);
        process.exit(1);
    }
});
program.parse();

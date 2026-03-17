"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initApp = initApp;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const child_process_1 = require("child_process");
const paths_1 = require("./paths");
// Get version from package.json
function getFrameworkVersion() {
    try {
        const pkgPath = path_1.default.join((0, paths_1.getPackageRoot)(), "package.json");
        const pkg = JSON.parse(fs_1.default.readFileSync(pkgPath, "utf-8"));
        return pkg.version || "0.1.1";
    }
    catch {
        return "0.1.1";
    }
}
/**
 * Scaffold a new MVC application.
 */
async function initApp(dir, options = {}) {
    const targetDir = path_1.default.resolve(dir);
    const templateDir = path_1.default.join((0, paths_1.getTemplatesDir)(), "appScaffold");
    console.log(`Creating new MVC application in ${targetDir}...`);
    // Create target directory
    if (!fs_1.default.existsSync(targetDir)) {
        fs_1.default.mkdirSync(targetDir, { recursive: true });
    }
    // Copy app scaffold templates
    copyDirRecursive(templateDir, targetDir);
    // Rename dotfiles (npm doesn't publish dotfiles, so we use .txt extensions)
    const renames = [
        ["gitignore.txt", ".gitignore"],
        ["env.example.txt", ".env.example"],
    ];
    for (const [src, dest] of renames) {
        const srcPath = path_1.default.join(targetDir, src);
        const destPath = path_1.default.join(targetDir, dest);
        if (fs_1.default.existsSync(srcPath)) {
            fs_1.default.renameSync(srcPath, destPath);
        }
    }
    // Update package.json with app name and framework version
    const appPackageJson = path_1.default.join(targetDir, "package.json");
    if (fs_1.default.existsSync(appPackageJson)) {
        const pkg = JSON.parse(fs_1.default.readFileSync(appPackageJson, "utf-8"));
        pkg.name = path_1.default.basename(dir);
        // Use npm package version (not file path)
        pkg.dependencies["@erwininteractive/mvc"] = `^${getFrameworkVersion()}`;
        fs_1.default.writeFileSync(appPackageJson, JSON.stringify(pkg, null, 2));
    }
    console.log("Application scaffolded successfully!");
    // Install dependencies
    if (!options.skipInstall) {
        console.log("\nInstalling dependencies...");
        try {
            (0, child_process_1.execSync)("npm install", { cwd: targetDir, stdio: "inherit" });
        }
        catch {
            console.error("Failed to install dependencies. Please run 'npm install' manually.");
        }
    }
    // Setup database if requested
    if (options.withDatabase) {
        setupDatabase(targetDir);
    }
    // Setup CI if requested
    if (options.withCi) {
        setupCi(targetDir);
    }
    console.log(`
Next steps:
  cd ${dir}
  npm run dev

Your app is ready! Visit http://localhost:3000
${!options.withDatabase ? `
To add database support later:
  npm run db:setup
  # Edit .env with DATABASE_URL
  npx prisma migrate dev --name init
` : ""}`);
}
/**
 * Setup GitHub Actions CI workflow.
 */
function setupCi(targetDir) {
    const workflowDir = path_1.default.join(targetDir, ".github", "workflows");
    fs_1.default.mkdirSync(workflowDir, { recursive: true });
    const ciTemplateDir = path_1.default.join((0, paths_1.getTemplatesDir)(), "ci");
    const testWorkflow = path_1.default.join(ciTemplateDir, "test.yml");
    if (fs_1.default.existsSync(testWorkflow)) {
        fs_1.default.copyFileSync(testWorkflow, path_1.default.join(workflowDir, "test.yml"));
        console.log("GitHub Actions CI workflow added.");
    }
}
/**
 * Setup Prisma database support.
 */
function setupDatabase(targetDir) {
    // Copy prisma schema
    const prismaDir = path_1.default.join(targetDir, "prisma");
    if (!fs_1.default.existsSync(prismaDir)) {
        fs_1.default.mkdirSync(prismaDir, { recursive: true });
    }
    const frameworkPrismaSchema = path_1.default.join((0, paths_1.getPrismaDir)(), "schema.prisma");
    if (fs_1.default.existsSync(frameworkPrismaSchema)) {
        fs_1.default.copyFileSync(frameworkPrismaSchema, path_1.default.join(prismaDir, "schema.prisma"));
    }
    // Install Prisma
    console.log("\nSetting up database...");
    try {
        (0, child_process_1.execSync)("npm install @prisma/client prisma", { cwd: targetDir, stdio: "inherit" });
        (0, child_process_1.execSync)("npx prisma generate", { cwd: targetDir, stdio: "inherit" });
    }
    catch {
        console.error("Failed to setup Prisma. Run 'npm run db:setup' manually.");
    }
}
/**
 * Recursively copy a directory.
 */
function copyDirRecursive(src, dest) {
    if (!fs_1.default.existsSync(src)) {
        return;
    }
    if (!fs_1.default.existsSync(dest)) {
        fs_1.default.mkdirSync(dest, { recursive: true });
    }
    const entries = fs_1.default.readdirSync(src, { withFileTypes: true });
    for (const entry of entries) {
        const srcPath = path_1.default.join(src, entry.name);
        const destPath = path_1.default.join(dest, entry.name);
        if (entry.isDirectory()) {
            copyDirRecursive(srcPath, destPath);
        }
        else {
            fs_1.default.copyFileSync(srcPath, destPath);
        }
    }
}

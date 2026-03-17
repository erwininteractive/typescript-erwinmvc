"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPackageRoot = getPackageRoot;
exports.getTemplatesDir = getTemplatesDir;
exports.getPrismaDir = getPrismaDir;
exports.getEnvExamplePath = getEnvExamplePath;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
/**
 * Get the root directory of the framework package.
 * Works whether running from src/ (development) or dist/ (production).
 */
function getPackageRoot() {
    // Start from this file's directory and walk up to find package.json
    let dir = __dirname;
    // Walk up at most 5 levels to find package.json with our package name
    for (let i = 0; i < 5; i++) {
        const packageJsonPath = path_1.default.join(dir, "package.json");
        if (fs_1.default.existsSync(packageJsonPath)) {
            try {
                const pkg = JSON.parse(fs_1.default.readFileSync(packageJsonPath, "utf-8"));
                if (pkg.name === "@erwininteractive/mvc") {
                    return dir;
                }
            }
            catch {
                // Continue searching
            }
        }
        dir = path_1.default.dirname(dir);
    }
    // Fallback: assume we're in dist/generators or src/generators
    return path_1.default.resolve(__dirname, "../..");
}
/**
 * Get the templates directory path.
 */
function getTemplatesDir() {
    return path_1.default.join(getPackageRoot(), "templates");
}
/**
 * Get the prisma directory path.
 */
function getPrismaDir() {
    return path_1.default.join(getPackageRoot(), "prisma");
}
/**
 * Get the .env.example file path.
 */
function getEnvExamplePath() {
    return path_1.default.join(getPackageRoot(), ".env.example");
}

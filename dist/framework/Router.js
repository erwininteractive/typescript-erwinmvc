"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerControllers = registerControllers;
exports.registerController = registerController;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
/**
 * Convert a controller name to a resource path.
 * e.g., "UserController" -> "users", "PostController" -> "posts"
 */
function controllerNameToResource(name) {
    // Remove "Controller" suffix
    const baseName = name.replace(/Controller$/, "");
    // Convert to lowercase and simple pluralization
    const lower = baseName.toLowerCase();
    // Simple pluralization: add 's' if not already ending in 's'
    return lower.endsWith("s") ? lower : lower + "s";
}
/**
 * Register controllers from a directory with convention-based routing.
 *
 * Convention:
 * - GET /<resource> -> index
 * - GET /<resource>/:id -> show
 * - POST /<resource> -> store
 * - PUT /<resource>/:id -> update
 * - DELETE /<resource>/:id -> destroy
 *
 * @param app - Express application instance
 * @param controllersDir - Absolute path to the controllers directory
 */
async function registerControllers(app, controllersDir) {
    if (!fs_1.default.existsSync(controllersDir)) {
        console.warn(`Controllers directory not found: ${controllersDir}`);
        return;
    }
    const files = fs_1.default.readdirSync(controllersDir);
    const controllerFiles = files.filter((f) => f.endsWith("Controller.ts") || f.endsWith("Controller.js"));
    for (const file of controllerFiles) {
        const controllerPath = path_1.default.join(controllersDir, file);
        const controllerName = path_1.default.basename(file, path_1.default.extname(file));
        const resource = controllerNameToResource(controllerName);
        try {
            // Dynamic import for ES modules
            const controller = await Promise.resolve(`${controllerPath}`).then(s => __importStar(require(s)));
            // Register routes based on exported functions
            if (controller.index) {
                app.get(`/${resource}`, controller.index);
            }
            if (controller.show) {
                app.get(`/${resource}/:id`, controller.show);
            }
            if (controller.store) {
                app.post(`/${resource}`, controller.store);
            }
            if (controller.update) {
                app.put(`/${resource}/:id`, controller.update);
            }
            if (controller.destroy) {
                app.delete(`/${resource}/:id`, controller.destroy);
            }
            console.log(`Registered controller: ${controllerName} -> /${resource}`);
        }
        catch (err) {
            console.error(`Failed to load controller ${file}:`, err);
        }
    }
}
/**
 * Register a single controller with custom base path.
 */
function registerController(app, basePath, controller) {
    const resource = basePath.startsWith("/") ? basePath : `/${basePath}`;
    if (controller.index) {
        app.get(resource, controller.index);
    }
    if (controller.show) {
        app.get(`${resource}/:id`, controller.show);
    }
    if (controller.store) {
        app.post(resource, controller.store);
    }
    if (controller.update) {
        app.put(`${resource}/:id`, controller.update);
    }
    if (controller.destroy) {
        app.delete(`${resource}/:id`, controller.destroy);
    }
}

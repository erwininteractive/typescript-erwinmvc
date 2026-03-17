"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMvcApp = createMvcApp;
exports.startServer = startServer;
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const redis_1 = require("redis");
const connect_redis_1 = __importDefault(require("connect-redis"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
// Load environment variables
dotenv_1.default.config();
/**
 * Create and configure an Express MVC application.
 *
 * Includes:
 * - Helmet for security headers
 * - CORS support
 * - JSON and URL-encoded body parsing
 * - Redis-backed sessions (if REDIS_URL is set)
 * - EJS view engine
 * - Static file serving
 */
async function createMvcApp(options = {}) {
    const { viewsPath = "src/views", publicPath = "public", enableRedis = !!process.env.REDIS_URL, corsOptions = {}, helmetOptions = {}, } = options;
    const app = (0, express_1.default)();
    // Security middleware
    app.use((0, helmet_1.default)(helmetOptions));
    app.use((0, cors_1.default)(corsOptions));
    // Body parsing
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    // Static files
    app.use(express_1.default.static(path_1.default.resolve(publicPath)));
    // Session store (Redis if available, memory otherwise)
    let redisClient = null;
    if (enableRedis && process.env.REDIS_URL) {
        try {
            redisClient = (0, redis_1.createClient)({ url: process.env.REDIS_URL });
            await redisClient.connect();
            const store = new connect_redis_1.default({
                client: redisClient,
                prefix: "mvc:",
            });
            app.use((0, express_session_1.default)({
                store,
                secret: process.env.SESSION_SECRET || "default-secret-change-me",
                resave: false,
                saveUninitialized: false,
                cookie: {
                    secure: process.env.NODE_ENV === "production",
                    httpOnly: true,
                    maxAge: 1000 * 60 * 60 * 24, // 24 hours
                },
            }));
            console.log("Using Redis session store");
        }
        catch (err) {
            console.warn("Failed to connect to Redis, using memory sessions:", err);
            redisClient = null;
            setupMemorySessions(app);
        }
    }
    else {
        // Use memory sessions when Redis is not configured
        setupMemorySessions(app);
    }
    // View engine
    app.set("view engine", "ejs");
    app.set("views", path_1.default.resolve(viewsPath));
    return { app, redisClient };
}
/**
 * Setup memory-based sessions (for development without Redis).
 */
function setupMemorySessions(app) {
    app.use((0, express_session_1.default)({
        secret: process.env.SESSION_SECRET || "default-secret-change-me",
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: process.env.NODE_ENV === "production",
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24, // 24 hours
        },
    }));
}
/**
 * Start the Express server.
 */
function startServer(app, port = Number(process.env.PORT) || 3000) {
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
}

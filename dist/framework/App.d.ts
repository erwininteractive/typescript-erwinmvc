import { Express } from "express";
import { RedisClientType } from "redis";
import helmet from "helmet";
import cors from "cors";
export interface MvcAppOptions {
    /** Directory for EJS views (default: "src/views") */
    viewsPath?: string;
    /** Directory for static files (default: "public") */
    publicPath?: string;
    /** Directory for controllers (default: "src/controllers") */
    controllersPath?: string;
    /** Enable Redis sessions (default: true if REDIS_URL is set) */
    enableRedis?: boolean;
    /** Custom CORS options */
    corsOptions?: cors.CorsOptions;
    /** Custom Helmet options */
    helmetOptions?: Parameters<typeof helmet>[0];
}
export interface MvcApp {
    app: Express;
    redisClient: RedisClientType | null;
}
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
export declare function createMvcApp(options?: MvcAppOptions): Promise<MvcApp>;
/**
 * Start the Express server.
 */
export declare function startServer(app: Express, port?: number): void;

import type { Express, Request, Response } from "express";
type RouteHandler = (req: Request, res: Response) => Promise<void> | void;
interface ControllerModule {
    index?: RouteHandler;
    show?: RouteHandler;
    store?: RouteHandler;
    update?: RouteHandler;
    destroy?: RouteHandler;
    [key: string]: RouteHandler | undefined;
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
export declare function registerControllers(app: Express, controllersDir: string): Promise<void>;
/**
 * Register a single controller with custom base path.
 */
export declare function registerController(app: Express, basePath: string, controller: ControllerModule): void;
export {};

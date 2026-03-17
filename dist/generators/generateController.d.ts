export interface GenerateControllerOptions {
    views?: boolean;
}
/**
 * Generate a CRUD controller.
 */
export declare function generateController(name: string, options?: GenerateControllerOptions): Promise<void>;

export interface GenerateResourceOptions {
    skipModel?: boolean;
    skipController?: boolean;
    skipViews?: boolean;
    skipMigrate?: boolean;
    apiOnly?: boolean;
}
/**
 * Generate a complete resource: model + controller + views.
 */
export declare function generateResource(name: string, options?: GenerateResourceOptions): Promise<void>;

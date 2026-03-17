export interface GenerateModelOptions {
    skipMigrate?: boolean;
}
/**
 * Generate a Prisma model and append it to schema.prisma.
 */
export declare function generateModel(name: string, options?: GenerateModelOptions): Promise<void>;

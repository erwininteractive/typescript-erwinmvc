/**
 * Get or create a singleton PrismaClient instance.
 * Safe for use in long-running Node processes.
 *
 * Note: Only call this if your app uses a database.
 * Throws an error if @prisma/client is not installed.
 */
export declare function getPrismaClient(): any;
/**
 * Disconnect the Prisma client.
 * Useful for graceful shutdown.
 */
export declare function disconnectPrisma(): Promise<void>;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrismaClient = getPrismaClient;
exports.disconnectPrisma = disconnectPrisma;
// Prisma is optional - only loaded when needed
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let prisma = null;
let PrismaClient = null;
/**
 * Get or create a singleton PrismaClient instance.
 * Safe for use in long-running Node processes.
 *
 * Note: Only call this if your app uses a database.
 * Throws an error if @prisma/client is not installed.
 */
function getPrismaClient() {
    if (!prisma) {
        if (!PrismaClient) {
            try {
                // Dynamic import to make Prisma optional
                // eslint-disable-next-line @typescript-eslint/no-require-imports
                PrismaClient = require("@prisma/client").PrismaClient;
            }
            catch {
                throw new Error("Prisma is not installed. Run 'npm install @prisma/client prisma' to use database features.");
            }
        }
        prisma = new PrismaClient();
    }
    return prisma;
}
/**
 * Disconnect the Prisma client.
 * Useful for graceful shutdown.
 */
async function disconnectPrisma() {
    if (prisma) {
        await prisma.$disconnect();
        prisma = null;
    }
}

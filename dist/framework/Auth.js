"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = hashPassword;
exports.verifyPassword = verifyPassword;
exports.signToken = signToken;
exports.verifyToken = verifyToken;
exports.authenticate = authenticate;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
/**
 * Hash a plain text password using bcrypt.
 */
async function hashPassword(plain) {
    const salt = await bcryptjs_1.default.genSalt(10);
    return bcryptjs_1.default.hash(plain, salt);
}
/**
 * Verify a plain text password against a bcrypt hash.
 */
async function verifyPassword(plain, hash) {
    return bcryptjs_1.default.compare(plain, hash);
}
/**
 * Sign a JWT token with the given payload.
 * Token expires in 1 hour by default.
 */
function signToken(payload, expiresIn = "1h") {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("JWT_SECRET environment variable is not set");
    }
    return jsonwebtoken_1.default.sign(payload, secret, { expiresIn });
}
/**
 * Verify and decode a JWT token.
 * Returns the decoded payload or throws an error if invalid.
 */
function verifyToken(token) {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("JWT_SECRET environment variable is not set");
    }
    return jsonwebtoken_1.default.verify(token, secret);
}
/**
 * Express middleware to authenticate requests using JWT Bearer tokens.
 * Attaches the decoded user payload to req.user on success.
 */
function authenticate(req, res, next) {
    const header = req.header("Authorization");
    const token = header?.startsWith("Bearer ") ? header.slice(7) : null;
    if (!token) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }
    try {
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    }
    catch {
        res.status(401).json({ error: "Invalid token" });
    }
}

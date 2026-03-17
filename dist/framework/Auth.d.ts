import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
/**
 * Hash a plain text password using bcrypt.
 */
export declare function hashPassword(plain: string): Promise<string>;
/**
 * Verify a plain text password against a bcrypt hash.
 */
export declare function verifyPassword(plain: string, hash: string): Promise<boolean>;
/**
 * Sign a JWT token with the given payload.
 * Token expires in 1 hour by default.
 */
export declare function signToken(payload: object, expiresIn?: string | number): string;
/**
 * Verify and decode a JWT token.
 * Returns the decoded payload or throws an error if invalid.
 */
export declare function verifyToken(token: string): jwt.JwtPayload | string;
/**
 * Express middleware to authenticate requests using JWT Bearer tokens.
 * Attaches the decoded user payload to req.user on success.
 */
export declare function authenticate(req: Request & {
    user?: jwt.JwtPayload | string;
}, res: Response, next: NextFunction): void;

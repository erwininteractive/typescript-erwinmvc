"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerController = exports.registerControllers = exports.authenticate = exports.verifyToken = exports.signToken = exports.verifyPassword = exports.hashPassword = exports.disconnectPrisma = exports.getPrismaClient = exports.startServer = exports.createMvcApp = void 0;
// App factory and server
var App_1 = require("./App");
Object.defineProperty(exports, "createMvcApp", { enumerable: true, get: function () { return App_1.createMvcApp; } });
Object.defineProperty(exports, "startServer", { enumerable: true, get: function () { return App_1.startServer; } });
// Database
var db_1 = require("./db");
Object.defineProperty(exports, "getPrismaClient", { enumerable: true, get: function () { return db_1.getPrismaClient; } });
Object.defineProperty(exports, "disconnectPrisma", { enumerable: true, get: function () { return db_1.disconnectPrisma; } });
// Authentication
var Auth_1 = require("./Auth");
Object.defineProperty(exports, "hashPassword", { enumerable: true, get: function () { return Auth_1.hashPassword; } });
Object.defineProperty(exports, "verifyPassword", { enumerable: true, get: function () { return Auth_1.verifyPassword; } });
Object.defineProperty(exports, "signToken", { enumerable: true, get: function () { return Auth_1.signToken; } });
Object.defineProperty(exports, "verifyToken", { enumerable: true, get: function () { return Auth_1.verifyToken; } });
Object.defineProperty(exports, "authenticate", { enumerable: true, get: function () { return Auth_1.authenticate; } });
// Routing
var Router_1 = require("./Router");
Object.defineProperty(exports, "registerControllers", { enumerable: true, get: function () { return Router_1.registerControllers; } });
Object.defineProperty(exports, "registerController", { enumerable: true, get: function () { return Router_1.registerController; } });

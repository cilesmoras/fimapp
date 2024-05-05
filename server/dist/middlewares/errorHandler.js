"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createError = void 0;
const createError = (statusCode, message) => {
    const err = new Error();
    // err.statusCode = statusCode || 500;
    err.message = message || "Internal server error.";
    return err;
};
exports.createError = createError;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let sysEnv = "development";
if (process.env["NODE_ENV"]) {
    sysEnv = process.env["NODE_ENV"];
}
exports.NODE_ENV = sysEnv;

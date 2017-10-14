/**
 * Created by chaolinding on 2017/10/14.
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sysEnv = "development";
if (process.env["NODE_ENV"]) {
    sysEnv = process.env["NODE_ENV"];
}
exports.NODE_ENV = sysEnv;

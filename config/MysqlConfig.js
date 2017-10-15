/**
 * Created by chaolinding on 2017/10/15.
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nodeEnv_1 = require("./nodeEnv");
var MysqlConfig_1 = require("./development/MysqlConfig");
var MysqlConfig_2 = require("./production/MysqlConfig");
var _MysqlConfig;
if (nodeEnv_1.NODE_ENV === "development") {
    _MysqlConfig = MysqlConfig_1.MysqlDevelopmentConfig;
}
else {
    _MysqlConfig = MysqlConfig_2.MysqlProductionConfig;
}
exports.MysqlConfig = _MysqlConfig;

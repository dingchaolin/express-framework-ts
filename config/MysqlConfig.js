"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodeEnv_1 = require("./nodeEnv");
const MysqlConfig_1 = require("./development/MysqlConfig");
const MysqlConfig_2 = require("./production/MysqlConfig");
let _MysqlConfig;
if (nodeEnv_1.NODE_ENV === "development") {
    _MysqlConfig = MysqlConfig_1.MysqlDevelopmentConfig;
}
else {
    _MysqlConfig = MysqlConfig_2.MysqlProductionConfig;
}
exports.MysqlConfig = _MysqlConfig;

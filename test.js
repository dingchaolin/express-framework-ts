"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MysqlConnection_1 = require("./common/MysqlConnection");
const MysqlConfig_1 = require("./config/MysqlConfig");
let mysql = new MysqlConnection_1.MysqlConnection(MysqlConfig_1.MysqlConfig);
let sql = `select id,name from student where id = ?`;
mysql.query(sql, [1], (error, results, fields) => {
    console.log(error, results, fields);
});

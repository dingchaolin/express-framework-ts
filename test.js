"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by chaolinding on 2017/10/15.
 */
var MysqlConnection_1 = require("./common/MysqlConnection");
var MysqlConfig_1 = require("./config/MysqlConfig");
var mysql = new MysqlConnection_1.MysqlConnection(MysqlConfig_1.MysqlConfig);
var sql = "insert into student values(2, 'man')";
mysql.query(sql, [], function (error, results, fields) {
    console.log(error, results, fields);
});
/*
 null OkPacket {
 fieldCount: 0,
 affectedRows: 1,
 insertId: 2,
 serverStatus: 2,
 warningCount: 0,
 message: '',
 protocol41: true,
 changedRows: 0 } undefined

 */ 

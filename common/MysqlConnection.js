"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql");
const MysqlConfig_1 = require("../config/MysqlConfig");
;
;
class MysqlConnection {
    constructor(config) {
        this.pool_Master = mysql.createPool(config.master);
        this.pool_Slave = mysql.createPool(config.slave);
    }
    ;
    poolQuery(pool, sql, options, callback) {
        pool.getConnection((err, connection) => {
            if (!err) {
                let query = connection.query(sql, options, (error, results, fields) => {
                    connection.release();
                    callback(error, results, fields);
                });
            }
            else {
                console.log(err);
            }
        });
    }
    ;
    query(sql, options, callback, forceMaster = false) {
        if (forceMaster) {
            return this.poolQuery(this.pool_Master, sql, options, callback);
        }
        else {
            sql = sql.trim();
            if (sql.substr(0, 6).toLowerCase() === "select") {
                return this.poolQuery(this.pool_Slave, sql, options, callback);
            }
            else {
                return this.poolQuery(this.pool_Master, sql, options, callback);
            }
        }
    }
    ;
    querySqlObj(sqlObj, callback, forceMaster = false) {
        return this.query(sqlObj.sql, sqlObj.options, callback, forceMaster);
    }
}
exports.MysqlConnection = MysqlConnection;
exports.mysqlInstance = new MysqlConnection(MysqlConfig_1.MysqlConfig);

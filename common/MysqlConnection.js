"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by chaolinding on 2017/10/15.
 */
var mysql = require("mysql");
;
;
var MysqlConnection = (function () {
    function MysqlConnection(config) {
        this.pool_Master = mysql.createPool(config.master);
        this.pool_Slave = mysql.createPool(config.slave);
    }
    ;
    MysqlConnection.prototype.poolQuery = function (pool, sql, options, callback) {
        pool.getConnection(function (err, connection) {
            if (!err) {
                var query = connection.query(sql, options, function (error, results, fields) {
                    connection.release();
                    callback(error, results, fields);
                });
            }
            else {
                console.log(err);
            }
        });
    };
    ;
    MysqlConnection.prototype.query = function (sql, options, callback, forceMaster) {
        if (forceMaster === void 0) { forceMaster = false; }
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
    };
    ;
    MysqlConnection.prototype.querySqlObj = function (sqlObj, callback, forceMaster) {
        if (forceMaster === void 0) { forceMaster = false; }
        return this.query(sqlObj.sql, sqlObj.options, callback, forceMaster);
    };
    return MysqlConnection;
}());
exports.MysqlConnection = MysqlConnection;

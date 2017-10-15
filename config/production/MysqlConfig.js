"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MysqlProductionConfig = {
    master: {
        host: "127.0.0.1",
        port: 3306,
        user: "root",
        password: "root",
        database: "mytest",
        charset: "utf8",
        connectionLimit: 20
    },
    slave: {
        host: "127.0.0.1",
        port: 3306,
        user: "root",
        password: "root",
        database: "mytest",
        charset: "utf8",
        connectionLimit: 20
    }
};

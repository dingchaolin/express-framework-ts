"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const MysqlConnection_1 = require("../common/MysqlConnection");
const _ = require("lodash");
class BaseModel {
    constructor() {
        this.DB = MysqlConnection_1.mysqlInstance;
    }
    formatSqlObject(sql, options) {
        return { sql, options };
    }
    formatWhereObject(whereObj) {
        let whereStr = "";
        let options = [];
        if (_.isEmpty(whereObj)) {
            return { whereStr, options };
        }
        if (typeof whereObj === "object") {
            whereStr += " where ";
            let i = 0;
            for (let key in whereObj) {
                let value = whereObj[key];
                if (i != 0) {
                    whereStr += " AND ";
                }
                whereStr += `${key} = ?`;
                options.push(value);
                ++i;
            }
            return { whereStr, options };
        }
        whereStr = ` where ${whereObj}`;
        return { whereStr, options };
    }
    formatDeleteSql(tabelname, where) {
        let sql = `delete from ${tabelname} where `;
        let whereObj = this.formatWhereObject(where);
        sql += whereObj.whereStr;
        return this.formatSqlObject(sql, whereObj.options);
    }
    formatListSql(tablename, fieldsStr, whereObj, orderbyStr = "", offset = 0, limit = 0) {
        let { whereStr, options } = this.formatWhereObject(whereObj);
        let orderByStr = "";
        if (!_.isEmpty(orderbyStr)) {
            orderByStr = ` order by ${orderbyStr} `;
        }
        let limitBy = "";
        if (offset != 0 && limit == 0) {
            limitBy = ` limit 0,${offset} `;
        }
        else if (offset != 0 && limit != 0) {
            limitBy = ` limit ${offset},${limit} `;
        }
        else if (offset == 0 && limit != 0) {
            limitBy = ` limit 0,${offset} `;
        }
        let sql = `select ${fieldsStr} from ${tablename} ${whereStr} ${orderByStr} ${limitBy} `;
        return this.formatSqlObject(sql, options);
    }
    formatUpdateSql(tablename, fieldObject, whereObj) {
        let sql = `update ${tablename} set `, i = 0, updateOptions = [];
        for (let key in fieldObject) {
            let value = fieldObject[key];
            if (i == 0) {
                sql += ` ${key} = ${value} `;
            }
            else {
                sql += `, ${key} = ${value} `;
            }
            updateOptions.push(value);
            ++i;
        }
        let { whereStr, options } = this.formatWhereObject(whereObj);
        sql += whereStr;
        updateOptions = updateOptions.concat(options);
        return this.formatSqlObject(sql, updateOptions);
    }
    formatInsertSql(tablename, fieldObject, isReplace = false) {
        let sql = "", i = 0, options = [], fieldsList = "", valueList = "";
        if (!isReplace) {
            sql = `insert into ${tablename} `;
        }
        else {
            sql = `replace into ${tablename} `;
        }
        for (let key in fieldObject) {
            if (i == 0) {
                fieldsList += key;
                valueList += '?';
            }
            else {
                fieldsList += `,${key}`;
                valueList += ',?';
            }
            options.push(fieldsList[key]);
            ++i;
        }
        sql += `(${fieldsList}) values (${valueList})`;
        return this.formatSqlObject(sql, options);
    }
    querySqlObject(connection, sqlObj, forceMaster = false) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                connection.querySqlObj(sqlObj, (error, results, fields) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(results);
                    }
                }, forceMaster);
            });
        });
    }
    insertData(connetion, tablename, fieldObject, isReplace = false) {
        return __awaiter(this, void 0, void 0, function* () {
            let sqlObj = this.formatInsertSql(tablename, fieldObject, isReplace);
            let result = yield this.querySqlObject(connetion, sqlObj);
            if (result && _.isObject(result)) {
                return result.insertId;
            }
            else {
                return 0;
            }
        });
    }
    fetchFirst(connection, tablename, fieldsStr, whereObj, orderbyStr = "", offset = 0, limit = 0, forceMaster = false) {
        return __awaiter(this, void 0, void 0, function* () {
            let sqlObj = this.formatListSql(tablename, fieldsStr, whereObj, orderbyStr, offset, limit);
            let result = yield this.querySqlObject(connection, sqlObj, forceMaster);
            if (result && _.isArray(result) && !_.isEmpty(result)) {
                return result[0];
            }
            else {
                return {};
            }
        });
    }
    fetchList(connection, tablename, fieldsStr, whereObj, orderbyStr = "", offset = 0, limit = 0, forceMaster = false) {
        return __awaiter(this, void 0, void 0, function* () {
            let sqlObj = this.formatListSql(tablename, fieldsStr, whereObj, orderbyStr, offset, limit);
            let result = yield this.querySqlObject(connection, sqlObj, forceMaster);
            if (result && _.isArray(result) && !_.isEmpty(result)) {
                return result;
            }
            else {
                return {};
            }
        });
    }
}
exports.BaseModel = BaseModel;

/**
 * Created by chaolinding on 2017/10/16.
 */
import {SqlObject,WhereObject,MysqlConnection,mysqlInstance} from "../common/MysqlConnection";
import {IError,IFieldInfo} from "mysql";
import {MysqlConfig} from "../config/MysqlConfig";
import * as _ from "lodash";

export class BaseModel{
    public DB:MysqlConnection;
    protected tableName:string;

    constructor(){
        this.DB = mysqlInstance;
    }

    formatSqlObject( sql:string, options:any[] ):SqlObject{
        return {sql,options};
    }

    formatWhereObject(whereObj:any):WhereObject{

        let whereStr:string = "";
        let options:any[] = [];

        if( _.isEmpty( whereObj ) ){
            return {whereStr,options};
        }

        if( typeof whereObj === "object" ){
            whereStr += " where ";
            let i = 0;
            for( let key in whereObj ){
                let value = whereObj[key];
                if( i != 0 ){
                    whereStr += " AND "
                }
                whereStr += `${key} = ?`;
                options.push(value);
                ++i;
            }
            return {whereStr,options};
        }

        whereStr = ` where ${whereObj}`;
        return {whereStr,options};

    }

    formatDeleteSql(tabelname:string, where:any):SqlObject{

        let sql = `delete from ${tabelname} where `;
        let whereObj = this.formatWhereObject( where );
        sql += whereObj.whereStr;

        return this.formatSqlObject( sql, whereObj.options);
    }

    formatListSql( tablename:string,
                   fieldsStr:string,
                   whereObj:any,
                   orderbyStr:string = "",
                   offset:number = 0,
                   limit:number = 0):SqlObject{

        let {whereStr, options} = this.formatWhereObject( whereObj );

        let orderByStr = "";
        if( !_.isEmpty(orderbyStr) ){
            orderByStr = ` order by ${orderbyStr} `;
        }

        let limitBy: string = "";
        if( offset != 0 && limit == 0 ){//只设置offset，做limit使用
            limitBy = ` limit 0,${offset} `;
        }else if( offset != 0 && limit != 0 ){
            limitBy = ` limit ${offset},${limit} `;
        }else if( offset == 0 && limit != 0 ){
            limitBy = ` limit 0,${offset} `;
        }

        let sql = `select ${fieldsStr} from ${tablename} ${whereStr} ${orderByStr} ${limitBy} `;
        return this.formatSqlObject( sql, options );

    }

    formatUpdateSql( tablename:string, fieldObject:any, whereObj:any ):SqlObject{
        let sql = `update ${tablename} set `,
            i = 0,
            updateOptions:any[] = [];

        for( let key in fieldObject ){
            let value = fieldObject[key];
            if( i == 0 ){
                 sql +=  ` ${key} = ${value} `;
            }else {
                sql +=  `, ${key} = ${value} `;
            }
            updateOptions.push( value );
            ++i;
        }

        let {whereStr, options} = this.formatWhereObject( whereObj );
        sql += whereStr;
        updateOptions = updateOptions.concat( options );

        return this.formatSqlObject( sql, updateOptions );

    }

    formatInsertSql(  tablename:string, fieldObject:any, isReplace:boolean = false):SqlObject{

        let sql:string = "",
            i = 0,
            options:any[] = [],
            fieldsList:string = "",
            valueList:string = "";

        if( !isReplace ){
            sql = `insert into ${tablename} `;
        }else{
            sql = `replace into ${tablename} `;
        }

        for( let key in fieldObject ){
            if( i == 0 ){
                fieldsList += key;
                valueList += '?';
            }else{
                fieldsList += `,${key}`;
                valueList += ',?';
            }

            options.push( fieldsList[key] );
            ++i;

        }

        sql += `(${fieldsList}) values (${valueList})`

        return this.formatSqlObject( sql, options );
    }

    protected async querySqlObject( connection:MysqlConnection, sqlObj:SqlObject, forceMaster:boolean = false ):Promise<any>{

        return new Promise( (resolve, reject ) => {
            connection.querySqlObj( sqlObj, (error:IError, results?:any, fields?:IFieldInfo[] ) => {
                if( error ){
                    reject( error );
                }else{
                    resolve( results );
                }

            }, forceMaster );
        })

    }

    async insertData( connetion:MysqlConnection, tablename:string, fieldObject:any, isReplace:boolean = false ){
        let sqlObj = this.formatInsertSql( tablename, fieldObject, isReplace );
        let result = await this.querySqlObject( connetion, sqlObj );

        if( result && _.isObject(result) ){
            return result.insertId
        }else{
            return 0;
        }
    }

    async fetchFirst( connection: MysqlConnection,
                      tablename:string,
                      fieldsStr:string,
                      whereObj:any,
                      orderbyStr:string = "",
                      offset:number = 0,
                      limit:number = 0,
                      forceMaster:boolean = false ){

        let sqlObj = this.formatListSql( tablename, fieldsStr, whereObj, orderbyStr, offset, limit );
        let result = await this.querySqlObject( connection, sqlObj, forceMaster );
        if( result && _.isArray(result) && !_.isEmpty(result) ){
            return result[0];
        }else{
            return {};
        }

    }

    async fetchList( connection: MysqlConnection,
                      tablename:string,
                      fieldsStr:string,
                      whereObj:any,
                      orderbyStr:string = "",
                      offset:number = 0,
                      limit:number = 0,
                      forceMaster:boolean = false ){

        let sqlObj = this.formatListSql( tablename, fieldsStr, whereObj, orderbyStr, offset, limit );
        let result = await this.querySqlObject( connection, sqlObj, forceMaster );
        if( result && _.isArray(result) && !_.isEmpty(result) ){
            return result;
        }else{
            return {};
        }

    }


}
/**
 * Created by chaolinding on 2017/10/15.
 */
import * as mysql from "mysql";
import {IPool,IError,IConnection,IFieldInfo} from "mysql";
import * as _ from "lodash";
import {MysqlConfig, MysqlMasterSlaveConfig} from "../config/MysqlConfig";

type MysqlQueryCallBack = (error:IError, result?:any, Fields?:IFieldInfo[])=>void;

export interface SqlObject{
    sql:string;
    options:any[];
};

export interface WhereObject{
    whereStr:string;
    options:any[];
};

export class MysqlConnection{
    private pool_Master:IPool;
    private pool_Slave:IPool;

    constructor(config:MysqlMasterSlaveConfig){
        this.pool_Master = mysql.createPool(config.master);
        this.pool_Slave = mysql.createPool(config.slave);
    };

    private poolQuery(pool:IPool,sql:string,options:any[],callback:MysqlQueryCallBack){
        pool.getConnection( (err:IError, connection:IConnection) => {
            if( !err ){
                let query = connection.query(sql, options, (error: IError, results?: any, fields?: IFieldInfo[]) => {
                    connection.release();
                    callback( error, results, fields );
                })
            }else{
                console.log( err );
            }
        })
    };

    public query(sql:string, options:any[], callback:MysqlQueryCallBack, forceMaster:boolean = false){
        if(forceMaster){
            return this.poolQuery(this.pool_Master, sql, options, callback);
        }else{
            sql = sql.trim();
            if(sql.substr(0,6).toLowerCase() === "select"){
                return this.poolQuery(this.pool_Slave, sql, options, callback);
            }else{
                return this.poolQuery(this.pool_Master, sql, options, callback);
            }
        }
    };

    public querySqlObj(sqlObj:SqlObject, callback:MysqlQueryCallBack, forceMaster:boolean = false){
        return this.query(sqlObj.sql, sqlObj.options, callback, forceMaster);
    }
}

export let mysqlInstance = new MysqlConnection( MysqlConfig );
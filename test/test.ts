/**
 * Created by chaolinding on 2017/10/15.
 */
import {SqlObject,WhereObject,MysqlConnection} from "../common/MysqlConnection";
import {IError,IFieldInfo} from "mysql";
import {MysqlConfig} from "../config/MysqlConfig";

let mysql = new MysqlConnection( MysqlConfig );

// let sql = `insert into student values(2, 'man')`;
// mysql.query( sql, [], (error:IError,results?:any,fields?:IFieldInfo[])=>{
//     console.log( error, results, fields );
// })

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

let sql = `select id,name from student where id = ?`;
mysql.query( sql, [1], (error:IError,results?:any,fields?:IFieldInfo[])=>{
    console.log( error, results, fields );
})
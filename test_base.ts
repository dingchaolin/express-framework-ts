/**
 * Created by chaolinding on 2017/10/15.
 */
import {SqlObject,WhereObject,MysqlConnection} from "./common/MysqlConnection";
import {IError,IFieldInfo} from "mysql";
import {MysqlConfig} from "./config/MysqlConfig";
import {BaseModel} from "./core/baseModel";

let mysql = new BaseModel();

let test = async () => {
    let ret = await mysql.fetchList( mysql.DB, 'student', 'id,name', "id >= 0 " );
    console.log( "where string======>",ret )
    return ret ;
}

let test1 = async () => {
    let ret = await mysql.fetchList( mysql.DB, 'student', 'id,name', {id:1} );
    console.log( "where object======>",ret )
    return ret ;
}
test();
test1();

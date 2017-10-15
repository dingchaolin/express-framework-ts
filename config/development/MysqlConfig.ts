/**
 * Created by chaolinding on 2017/10/15.
 */
import {MysqlMasterSlaveConfig} from "../MysqlConfig";
export let MysqlDevelopmentConfig: MysqlMasterSlaveConfig = {
    master:{
        host:"127.0.0.1",
        port:3306,
        user:"root",
        password:"root",
        database:"mytest",
        charset:"utf8",
        connectionLimit:20
    },
    slave:{
        host:"127.0.0.1",
        port:3306,
        user:"root",
        password:"root",
        database:"mytest",
        charset:"utf8",
        connectionLimit:20
    }
};
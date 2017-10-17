/**
 * Created by chaolinding on 2017/10/15.
 */

import {NODE_ENV} from "./nodeEnv";
import {IPoolConfig} from "mysql";
import {MysqlDevelopmentConfig} from "./development/MysqlConfig";
import {MysqlProductionConfig} from "./production/MysqlConfig";

export interface MysqlMasterSlaveConfig {
    master:IPoolConfig;
    slave:IPoolConfig;
}

console.log("NODE_ENV===",NODE_ENV);

let _MysqlConfig:MysqlMasterSlaveConfig;

if(NODE_ENV === "development"){
    _MysqlConfig = MysqlDevelopmentConfig;
}else{
    _MysqlConfig = MysqlProductionConfig;
}

export let MysqlConfig = _MysqlConfig;
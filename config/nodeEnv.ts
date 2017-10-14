/**
 * Created by chaolinding on 2017/10/14.
 */

let sysEnv:string = "development";

if( process.env["NODE_ENV"] ){
    sysEnv = process.env["NODE_ENV"] as string;
}

export let NODE_ENV:string = sysEnv;


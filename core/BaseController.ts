/**
 * Created by chaolinding on 2017/10/16.
 */
import * as ejs from "ejs";
import {dirname} from "path";
import * as express from "express";

import {EjsViewData} from "../interface/EjsViewData";

export class BaseController{
    protected ejsViewData: EjsViewData;

    constructor(){
        this.ejsViewData = {
            tdk:{
                title:"",
                keyword:"",
                desctription:""
            }
        }
    }

    private getTemplateFilePathByName( filename:string ){
        return dirname(__dirname) + "/view/" + filename;
    }

    async render( res: express.Response, filename: string ):Promise<any>{
        let self = this;

        return new Promise( ( resolve, reject) => {
            let options: ejs.Options = {};

            ejs.renderFile( self.getTemplateFilePathByName(filename), self.ejsViewData, options, (err:Error, str?:string) => {
                if( err ){
                    reject( err );
                }else{

                }
            })
        })

    }
}

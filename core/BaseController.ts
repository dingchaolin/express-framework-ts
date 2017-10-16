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
                description:""
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
            ejs.renderFile( self.getTemplateFilePathByName(filename),
                            self.ejsViewData,
                            options,
                            (err:Error, str?:string) => {
                                if( err ){
                                    reject( err );
                                    self.renderError( res, err.message );
                                }else{
                                    let html = str ? str: "";
                                    res.writeHead( 200, {'Content-Type':'text/html;charset=utf-8'});
                                    res.end(html);
                                    resolve(html);
                                    return;
                                }
                            });
        });

    }

    async renderNotFind( res: express.Response ):Promise<any>{
        let self = this;
        self.ejsViewData.title = "404";

        return new Promise( ( resolve, reject) => {
            ejs.renderFile( self.getTemplateFilePathByName("error/404.ejs"),
                self.ejsViewData,
                {},
                (err:Error, strErrorPage?:string) => {
                    if( err ){
                        res.end("error page 404");
                        reject( false );
                    }else{
                        let html = strErrorPage ? strErrorPage: "";
                        res.end(html);
                        resolve(html);
                        return;
                    }
                });
        });

    }

    async renderError( res: express.Response, error: string, options: ejs.Options = {}): Promise<any>{
        let self = this;
        return new Promise( ( resolve, reject) => {
            ejs.renderFile( self.getTemplateFilePathByName("error/error.ejs"),
                {error:error},
                options,
                (err:Error, strErrorPage?:string) => {
                    if( err ){
                        res.end("error page 404");
                        reject( false );
                    }else{
                        let html = strErrorPage ? strErrorPage: "";
                        res.end(html);
                        resolve(html);
                        return;
                    }
                });
        });
    }
}

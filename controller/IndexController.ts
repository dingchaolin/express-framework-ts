/**
 * Created by chaolinding on 2017/10/17.
 */
import {BaseController} from "../core/BaseController";
import * as express from "express";
import {IndexModel} from "../model/indexModel";

let indexModel = new IndexModel();

export class IndexController extends BaseController{

    constructor(){
        super();
    }

    async index( req: express.Request, res: express.Response, next: express.NextFunction ){
        try{

            let dataList = await indexModel.getList() as any[];
            this.ejsViewData.tdk.title = "首页";
            this.ejsViewData.tdk.description = "首页描述";
            this.ejsViewData.tdk.keyword = "首页关键词";
            this.ejsViewData.test = JSON.stringify( dataList );

            await this.render(res, "index.ejs")

        }catch( e ){
            console.log( "error=====", e );
        }
    }
}
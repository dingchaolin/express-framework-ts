/**
 * Created by chaolinding on 2017/10/17.
 */
import {Router} from "express";
import * as express from "express";
import {IndexController} from "../controller/IndexController";

let indexController = new IndexController();
export let IndexRouter = Router();

IndexRouter.get("/", function( req: express.Request, res: express.Response, next: express.NextFunction){

    indexController.index( req, res, next );
})
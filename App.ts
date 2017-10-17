/**
 * Created by chaolinding on 2017/10/17.
 */
import {CommonServer} from "./server/CommonServer";
import * as express from "express";

import {IndexRouter} from "./router/IndexRouter";
import {ServeStaticOptions} from "serve-static";
import {BaseController} from "./core/BaseController";

let baseController = new BaseController();

let app = new CommonServer().app;
app.listen( 3000 );

let options: ServeStaticOptions = {
    dotfiles: "ignore",
    etag: false,
    extensions: ['css', 'js', 'jpg', 'png', 'jpeg', 'gif', 'html', 'htm', 'txt'],
    index: false,
    redirect: false
};

app.use("/static", express.static("static", options));

app.use("/", IndexRouter);

app.use( function( req: express.Request, res: express.Response, next: express.NextFunction){
    res.status(404);
    renderNotFound( res );
    return;

})

app.use( function( err: any, req: express.Request, res: express.Response, next: express.NextFunction){
    res.end("500");
    return;
})

async function renderNotFound( res: express.Response ){
    try{
        baseController.renderNotFind(res);
    }catch ( e ){
        console.log( "404 error====", e );
    }
}
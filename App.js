"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const CommonServer_1 = require("./server/CommonServer");
const express = require("express");
const IndexRouter_1 = require("./router/IndexRouter");
const BaseController_1 = require("./core/BaseController");
let baseController = new BaseController_1.BaseController();
let app = new CommonServer_1.CommonServer().app;
app.listen(3000);
let options = {
    dotfiles: "ignore",
    etag: false,
    extensions: ['css', 'js', 'jpg', 'png', 'jpeg', 'gif', 'html', 'htm', 'txt'],
    index: false,
    redirect: false
};
app.use("/static", express.static("static", options));
app.use("/", IndexRouter_1.IndexRouter);
app.use(function (req, res, next) {
    res.status(404);
    renderNotFound(res);
    return;
});
app.use(function (err, req, res, next) {
    res.end("500");
    return;
});
function renderNotFound(res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            baseController.renderNotFind(res);
        }
        catch (e) {
            console.log("404 error====", e);
        }
    });
}

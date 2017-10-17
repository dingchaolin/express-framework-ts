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
const ejs = require("ejs");
const path_1 = require("path");
class BaseController {
    constructor() {
        this.ejsViewData = {
            tdk: {
                title: "",
                keyword: "",
                description: ""
            }
        };
    }
    getTemplateFilePathByName(filename) {
        return path_1.dirname(__dirname) + "/view/" + filename;
    }
    render(res, filename) {
        return __awaiter(this, void 0, void 0, function* () {
            let self = this;
            return new Promise((resolve, reject) => {
                let options = {};
                ejs.renderFile(self.getTemplateFilePathByName(filename), self.ejsViewData, options, (err, str) => {
                    if (err) {
                        reject(err);
                        self.renderError(res, err.message);
                    }
                    else {
                        let html = str ? str : "";
                        res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
                        res.end(html);
                        resolve(html);
                        return;
                    }
                });
            });
        });
    }
    renderNotFind(res) {
        return __awaiter(this, void 0, void 0, function* () {
            let self = this;
            self.ejsViewData.tdk.title = "404";
            return new Promise((resolve, reject) => {
                ejs.renderFile(self.getTemplateFilePathByName("error/404.ejs"), self.ejsViewData, {}, (err, strErrorPage) => {
                    if (err) {
                        res.end("error page 404");
                        reject(false);
                    }
                    else {
                        let html = strErrorPage ? strErrorPage : "";
                        res.end(html);
                        resolve(html);
                        return;
                    }
                });
            });
        });
    }
    renderError(res, error, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            let self = this;
            return new Promise((resolve, reject) => {
                ejs.renderFile(self.getTemplateFilePathByName("error/error.ejs"), { error: error }, options, (err, strErrorPage) => {
                    if (err) {
                        res.end("error page 404");
                        reject(false);
                    }
                    else {
                        let html = strErrorPage ? strErrorPage : "";
                        res.end(html);
                        resolve(html);
                        return;
                    }
                });
            });
        });
    }
}
exports.BaseController = BaseController;

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
const BaseController_1 = require("../core/BaseController");
const indexModel_1 = require("../model/indexModel");
let indexModel = new indexModel_1.IndexModel();
class IndexController extends BaseController_1.BaseController {
    constructor() {
        super();
    }
    index(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let dataList = yield indexModel.getList();
                this.ejsViewData.tdk.title = "首页";
                this.ejsViewData.tdk.description = "首页描述";
                this.ejsViewData.tdk.keyword = "首页关键词";
                this.ejsViewData.test = JSON.stringify(dataList);
                yield this.render(res, "index.ejs");
            }
            catch (e) {
                console.log("error=====", e);
            }
        });
    }
}
exports.IndexController = IndexController;

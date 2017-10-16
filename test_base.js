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
const baseModel_1 = require("./core/baseModel");
let mysql = new baseModel_1.BaseModel();
let test = () => __awaiter(this, void 0, void 0, function* () {
    let ret = yield mysql.fetchList(mysql.DB, 'student', 'id,name', "id >= 0 ");
    console.log("where string======>", ret);
    return ret;
});
let test1 = () => __awaiter(this, void 0, void 0, function* () {
    let ret = yield mysql.fetchList(mysql.DB, 'student', 'id,name', { id: 1 });
    console.log("where object======>", ret);
    return ret;
});
test();
test1();

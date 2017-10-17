"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const IndexController_1 = require("../controller/IndexController");
let indexController = new IndexController_1.IndexController();
exports.IndexRouter = express_1.Router();
exports.IndexRouter.get("/", function (req, res, next) {
    indexController.index(req, res, next);
});

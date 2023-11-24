"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const user_routes_1 = require("./app/modules/user/user.routes");
const app = (0, express_1.default)();
// parser
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Application all routers
app.use('/api/v1/users', user_routes_1.userRouter);
app.get('/', (_req, res) => {
    res.status(200).json({
        success: true,
        message: 'Congratulation! server is running',
        data: null,
    });
});
exports.default = app;

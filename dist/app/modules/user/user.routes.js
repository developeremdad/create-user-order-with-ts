"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const router = express_1.default.Router();
router.post('/', user_controller_1.userController.createNewUser);
router.get('/', user_controller_1.userController.retrieveAllUsers);
router.get('/:userId', user_controller_1.userController.getUserDetails);
router.put('/:userId', user_controller_1.userController.updateUserData);
router.delete('/:userId', user_controller_1.userController.deleteUserData);
router.put('/:userId/orders', user_controller_1.userController.addOrderToUser);
router.get('/:userId/orders', user_controller_1.userController.retrieveOrders);
router.get('/:userId/orders/total-price', user_controller_1.userController.calculateTotalOrderPrice);
exports.userRouter = router;

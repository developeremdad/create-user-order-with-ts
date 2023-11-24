"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
const user_model_1 = require("./user.model");
const user_services_1 = require("./user.services");
const user_validation_1 = __importStar(require("./user.validation"));
// create new user if not exist
const createNewUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.body;
        // check data validation by using zod
        const parsedData = user_validation_1.default.parse(userData);
        // parse data pass by services
        const result = yield user_services_1.userService.createNewUserService(parsedData);
        // check user is created or failed
        if (result) {
            res.status(200).json({
                success: true,
                message: 'User created successfully!',
                data: result,
            });
        }
        else {
            res.status(404).json({
                success: false,
                message: 'Something went wrong',
                error: {
                    code: 404,
                    description: 'Failed to create user',
                },
            });
        }
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: 'Something went wrong',
            error: {
                code: 404,
                description: error.message,
            },
        });
    }
});
// Retrieve all user controller
const retrieveAllUsers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_services_1.userService.retrieveAllUsersServices();
        if (result) {
            res.status(200).json({
                success: true,
                message: 'User fetched successfully!',
                data: result,
            });
        }
        else {
            res.status(404).json({
                success: false,
                message: 'Something went wrong',
                error: {
                    code: 404,
                    description: 'No users found',
                },
            });
        }
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: 'Something went wrong',
            error: {
                code: 404,
                description: error.message,
            },
        });
    }
});
// get a specific user
const getUserDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const result = yield user_services_1.userService.getUserDetailsService(Number(userId));
        res.status(200).json({
            success: true,
            message: 'User fetched successfully!',
            data: result,
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: error.message || 'Something went wrong',
            error: {
                code: 404,
                description: error.message,
            },
        });
    }
});
// update user data
const updateUserData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const updateData = req.body;
        const user = yield user_model_1.userModel.isUserExists(Number(userId));
        if (user) {
            // marge rest of data and set for update
            const mergedData = Object.assign(Object.assign(Object.assign({}, user), updateData), { password: updateData.password
                    ? yield bcrypt_1.default.hash(updateData.password, Number(config_1.default.bcrypt_salt_rounds))
                    : user.password });
            const parseUpdateData = user_validation_1.default.parse(mergedData);
            const updatedUser = yield user_services_1.userService.updateUserService(Number(userId), parseUpdateData);
            // send response
            if (updatedUser.modifiedCount !== 0) {
                res.status(200).json({
                    success: true,
                    message: 'User updated successfully!',
                    data: null,
                });
            }
            else {
                res.status(400).json({
                    success: false,
                    message: 'User already up to date',
                    error: {
                        code: 404,
                        description: 'User already up to date',
                    },
                });
            }
        }
        else {
            throw new Error('User not found');
        }
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: error.message || 'Something went wrong',
            error: {
                code: 404,
                description: error.message || error,
            },
        });
    }
});
// delete user data
const deleteUserData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        yield user_services_1.userService.deleteUserService(Number(userId));
        res.status(200).json({
            success: true,
            message: 'User deleted successfully!',
            data: null,
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: error.message || 'Something went wrong',
            error: {
                code: 404,
                description: error.message,
            },
        });
    }
});
// add new order product
const addOrderToUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const orderData = req.body;
    try {
        // check validation by zod
        const parsedData = user_validation_1.orderValidation.parse(orderData);
        const result = yield user_services_1.userService.addNewOrderService(Number(userId), parsedData);
        if (result.modifiedCount !== 0) {
            res.status(200).json({
                success: true,
                message: 'Order created successfully!',
                data: null,
            });
        }
        else {
            res.status(400).json({
                success: false,
                message: 'Order already exist',
                error: {
                    code: 400,
                    description: 'Order already exist',
                },
            });
        }
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: error.message || 'Something went wrong',
            error: {
                code: 404,
                description: error.message || error,
            },
        });
    }
});
// retrieve all order by a user
const retrieveOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const orders = yield user_services_1.userService.retrieveOrdersService(Number(userId));
        res.status(200).json({
            success: true,
            message: 'Order fetched successfully!',
            data: orders,
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: error.message || 'Something went wrong',
            error: {
                code: 404,
                description: error.message,
            },
        });
    }
});
// calculate total order price
const calculateTotalOrderPrice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const orders = yield user_services_1.userService.calculateTotalOrderPriceService(Number(userId));
        res.status(200).json({
            success: true,
            message: 'Total price calculated successfully!',
            data: orders,
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: error.message || 'Something went wrong',
            error: {
                code: 404,
                description: error.message,
            },
        });
    }
});
exports.userController = {
    createNewUser,
    retrieveAllUsers,
    getUserDetails,
    updateUserData,
    deleteUserData,
    addOrderToUser,
    retrieveOrders,
    calculateTotalOrderPrice,
};

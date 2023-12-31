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
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
    try {
        const { userId } = req.params;
        const newData = req.body;
        // const user = await userModel.isUserExists(Number(userId));
        const user = yield user_model_1.userModel.userWithPassword(Number(userId));
        if (user) {
            const mergedData = {
                userId: newData.userId ? newData.userId : user.userId,
                username: newData.username ? newData.username : user.username,
                password: newData.password
                    ? yield bcrypt_1.default.hash(newData.password, Number(config_1.default.bcrypt_salt_rounds))
                    : user.password,
                fullName: {
                    firstName: ((_a = newData === null || newData === void 0 ? void 0 : newData.fullName) === null || _a === void 0 ? void 0 : _a.firstName)
                        ? (_b = newData === null || newData === void 0 ? void 0 : newData.fullName) === null || _b === void 0 ? void 0 : _b.firstName
                        : user.fullName.firstName,
                    lastName: ((_c = newData === null || newData === void 0 ? void 0 : newData.fullName) === null || _c === void 0 ? void 0 : _c.lastName)
                        ? (_d = newData === null || newData === void 0 ? void 0 : newData.fullName) === null || _d === void 0 ? void 0 : _d.lastName
                        : (_e = user === null || user === void 0 ? void 0 : user.fullName) === null || _e === void 0 ? void 0 : _e.lastName,
                },
                age: newData.age ? newData.age : user.age,
                email: newData.email ? newData.email : user.email,
                isActive: newData.isActive ? newData.isActive : user.isActive,
                hobbies: newData.hobbies ? newData.hobbies : user.hobbies,
                address: {
                    street: ((_f = newData.address) === null || _f === void 0 ? void 0 : _f.street)
                        ? (_g = newData.address) === null || _g === void 0 ? void 0 : _g.street
                        : (_h = user.address) === null || _h === void 0 ? void 0 : _h.street,
                    city: ((_j = newData === null || newData === void 0 ? void 0 : newData.address) === null || _j === void 0 ? void 0 : _j.city)
                        ? (_k = newData === null || newData === void 0 ? void 0 : newData.address) === null || _k === void 0 ? void 0 : _k.city
                        : (_l = user === null || user === void 0 ? void 0 : user.address) === null || _l === void 0 ? void 0 : _l.city,
                    country: ((_m = newData === null || newData === void 0 ? void 0 : newData.address) === null || _m === void 0 ? void 0 : _m.country)
                        ? (_o = newData === null || newData === void 0 ? void 0 : newData.address) === null || _o === void 0 ? void 0 : _o.country
                        : (_p = user === null || user === void 0 ? void 0 : user.address) === null || _p === void 0 ? void 0 : _p.country,
                },
                orders: user.orders,
            };
            // check validation using zod
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

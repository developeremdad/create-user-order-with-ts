"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const user_model_1 = require("./user.model");
// create and store new user
const createNewUserService = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.userModel.isUserExists(userData.userId);
    if (user) {
        throw new Error('User already exists!');
    }
    const result = yield user_model_1.userModel.create(userData);
    return result;
});
//  Retrieve all users services
const retrieveAllUsersServices = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.userModel.find({}, {
        userName: 1,
        fullName: 1,
        age: 1,
        email: 1,
        address: 1,
    });
    return result;
});
// Get specific user details
const getUserDetailsService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.userModel.isUserExists(userId);
    if (user) {
        return user;
    }
    else {
        throw new Error('User no found');
    }
});
// update user fields
const updateUserService = (userId, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_model_1.userModel.isUserExists(userId)) {
        const result = yield user_model_1.userModel.updateOne({ userId }, updateData);
        return result;
    }
    else {
        throw new Error('User no found');
    }
});
// Delete user data by userId
const deleteUserService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_model_1.userModel.isUserExists(userId)) {
        const result = yield user_model_1.userModel.deleteOne({ userId });
        return result;
    }
    else {
        throw new Error('User no found');
    }
});
// add order service
const addNewOrderService = (userId, orderData) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_model_1.userModel.isUserExists(userId)) {
        const result = yield user_model_1.userModel.updateOne({ userId }, { $addToSet: { orders: orderData } }, { upsert: true });
        return result;
    }
    else {
        throw new Error('User no found');
    }
});
// Retrieve all orders
const retrieveOrdersService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.userModel.isUserExists(userId);
    if (user) {
        return user.orders;
    }
    else {
        throw new Error('User no found');
    }
});
// calculate total price of user
const calculateTotalOrderPriceService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_model_1.userModel.isUserExists(userId)) {
        const result = yield user_model_1.userModel.aggregate([
            {
                $match: {
                    userId: userId,
                },
            },
            {
                $project: {
                    _id: 0,
                    totalPrice: {
                        $sum: '$orders.price',
                    },
                },
            },
        ]);
        return result;
    }
    else {
        throw new Error('User no found');
    }
});
exports.userService = {
    createNewUserService,
    retrieveAllUsersServices,
    getUserDetailsService,
    updateUserService,
    deleteUserService,
    addNewOrderService,
    retrieveOrdersService,
    calculateTotalOrderPriceService,
};

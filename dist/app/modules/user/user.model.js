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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = require("mongoose");
const config_1 = __importDefault(require("../../config"));
const fullNameSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: [true, 'firstName field is required'],
        trim: true,
    },
    lastName: {
        type: String,
        required: [true, 'lastName field is required'],
        trim: true,
    },
}, { _id: false });
const addressSchema = new mongoose_1.Schema({
    street: {
        type: String,
        required: [true, 'street field is required'],
    },
    city: {
        type: String,
        required: [true, 'city field is required'],
    },
    country: {
        type: String,
        required: [true, 'country field is required'],
    },
}, { _id: false });
const orderSchema = new mongoose_1.Schema({
    productName: {
        type: String,
        required: [true, 'productName field is required'],
    },
    price: {
        type: Number,
        required: [true, 'price field is required'],
    },
    quantity: {
        type: Number,
        required: [true, 'quantity field is required'],
    },
}, { _id: false });
// make user schema
const userSchema = new mongoose_1.Schema({
    userId: {
        type: Number,
        unique: true,
        required: [true, 'userId field is required'],
    },
    username: {
        type: String,
        unique: true,
        required: [true, 'username field is required'],
    },
    password: {
        type: String,
        required: [true, 'password field is required'],
    },
    fullName: fullNameSchema,
    age: {
        type: Number,
        required: [true, 'age field is required'],
    },
    email: {
        type: String,
        required: [true, 'email field is required'],
    },
    isActive: {
        type: Boolean,
        required: [true, 'isActive field is required'],
        default: true,
    },
    hobbies: {
        type: [String],
        required: [true, 'hobbies field is required'],
    },
    address: addressSchema,
    orders: [orderSchema],
});
// hashing password using bcrypt
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        user.password = yield bcrypt_1.default.hash(user.password, Number(config_1.default.bcrypt_salt_rounds));
        next();
    });
});
// remove password for user
userSchema.post('save', function (doc, nex) {
    doc.password = '';
    nex();
});
// check query middleware method
userSchema.pre('find', function (next) {
    this.find({}, { password: 0 });
    next();
});
userSchema.pre('findOne', function (next) {
    this.findOne(this.getQuery(), { password: 0 });
    next();
});
userSchema.statics.isUserExists = function (userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingUser = yield exports.userModel.findOne({ userId });
        return existingUser;
    });
};
userSchema.statics.userWithPassword = function (userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return this.findOne({ userId }, { password: 1 });
    });
};
exports.userModel = (0, mongoose_1.model)('user', userSchema);

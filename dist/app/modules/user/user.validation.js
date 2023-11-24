"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderValidation = void 0;
const zod_1 = __importDefault(require("zod"));
const userValidationSchema = zod_1.default.object({
    userId: zod_1.default.number(),
    username: zod_1.default.string(),
    password: zod_1.default.string(),
    fullName: zod_1.default.object({
        firstName: zod_1.default.string().trim(),
        lastName: zod_1.default.string().trim(),
    }),
    age: zod_1.default.number(),
    email: zod_1.default.string().email(),
    isActive: zod_1.default.boolean(),
    hobbies: zod_1.default.array(zod_1.default.string()),
    address: zod_1.default.object({
        street: zod_1.default.string(),
        city: zod_1.default.string(),
        country: zod_1.default.string(),
    }),
});
exports.orderValidation = zod_1.default.object({
    productName: zod_1.default.string(),
    price: zod_1.default.number(),
    quantity: zod_1.default.number(),
});
exports.default = userValidationSchema;

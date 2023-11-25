import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../config';
import {
  StaticUserModel,
  TAddress,
  TFullName,
  TOrder,
  TUser,
} from './user.interface';

const fullNameSchema = new Schema<TFullName>(
  {
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
  },
  { _id: false }
);

const addressSchema = new Schema<TAddress>(
  {
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
  },
  { _id: false }
);

const orderSchema = new Schema<TOrder>(
  {
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
  },
  { _id: false }
);

// make user schema
const userSchema = new Schema<TUser, StaticUserModel>({
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
userSchema.pre('save', async function (next) {
  const user = this;

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
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

userSchema.statics.isUserExists = async function (userId: number) {
  const existingUser = await userModel.findOne({ userId });
  return existingUser;
};

userSchema.statics.userWithPassword = async function (userId: number) {
  return this.findOne({ userId }, { password: 1 });
};

export const userModel = model<TUser, StaticUserModel>('user', userSchema);

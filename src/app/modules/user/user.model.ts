import bcrypt from 'bcrypt';
import mongoose, { Schema } from 'mongoose';
import config from '../../config';
import { TAddress, TFullName, TOrder, TUser } from './user.interface';

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
const userSchema = new Schema<TUser>({
  userId: {
    type: Number,
    unique: true,
    required: [true, 'userId field is required'],
  },
  userName: {
    type: String,
    unique: true,
    required: [true, 'userName field is required'],
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
    unique: true,
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

const userModel = mongoose.model<TUser>('user', userSchema);

export default userModel;

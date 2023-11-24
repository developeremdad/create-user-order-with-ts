import { Model } from 'mongoose';

// make a full name type
export type TFullName = {
  firstName: string;
  lastName: string;
};

// make a hobbies type
export type THobby = {
  hobby: string[];
};

// make a address type
export type TAddress = {
  street: string;
  city: string;
  country: string;
};

// make a order type
export type TOrder = {
  productName: string;
  price: number;
  quantity: number;
};

// create and export user type for reuseable
export type TUser = {
  userId: number;
  username: string;
  password: string;
  fullName: TFullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: TAddress;
  orders?: TOrder[];
};

export interface StaticUserModel extends Model<TUser> {
  isUserExists(userId: number): Promise<TUser | null>;
}

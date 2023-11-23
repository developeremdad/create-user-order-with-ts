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
  userName: string;
  password: string;
  fullName: TFullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: TAddress;
  orders?: TOrder[];
};


// check user is exist or not by creating static
// export interface 
import { TOrder, TUser } from './user.interface';
import { userModel } from './user.model';

// create and store new user
const createNewUserService = async (userData: TUser) => {
  const user = await userModel.isUserExists(userData.userId);
  if (user) {
    throw new Error('User already exists!');
  }
  const result = await userModel.create(userData);
  return result;
};

//  Retrieve all users services
const retrieveAllUsersServices = async () => {
  const result = await userModel.find(
    {},
    {
      userName: 1,
      fullName: 1,
      age: 1,
      email: 1,
      address: 1,
    }
  );

  return result;
};

// Get specific user details
const getUserDetailsService = async (userId: number) => {
  const user = await userModel.isUserExists(userId);
  if (user) {
    return user;
  } else {
    throw new Error('User no found');
  }
};

// add order service
const addNewOrderService = async (userId: number, orderData: TOrder) => {
  if (await userModel.isUserExists(userId)) {
    const result = await userModel.updateOne(
      { userId },
      { $addToSet: { orders: orderData } },
      { upsert: true }
    );
    console.log(result);

    return result;
  } else {
    throw new Error('User no found');
  }
};

// Delete user data by userId
const deleteUserService = async (userId: number) => {
  const result = await userModel.deleteOne({ userId });
  return result;
};

// update user fields
const updateUserService = async (userId: number, updateData: TUser) => {
  if (await userModel.isUserExists(userId)) {
    const result = await userModel.updateOne({ userId }, updateData);
    return result;
  } else {
    throw new Error('User no found');
  }
};

export const userService = {
  createNewUserService,
  retrieveAllUsersServices,
  getUserDetailsService,
  deleteUserService,
  addNewOrderService,
  updateUserService,
};

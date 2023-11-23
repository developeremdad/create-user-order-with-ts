import { TUser } from './user.interface';
import userModel from './user.model';

// create and store new user
const createNewUserService = async (userData: TUser) => {
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
const getUserDetailsService = async (userId: string) => {
  const result = await userModel.findOne({ _id: Object(userId) });
  return result;
};

export const userService = {
  createNewUserService,
  retrieveAllUsersServices,
  getUserDetailsService,
};

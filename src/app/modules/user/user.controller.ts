import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import config from '../../config';
import { TUser } from './user.interface';
import { userModel } from './user.model';
import { userService } from './user.services';
import userValidationSchema, { orderValidation } from './user.validation';

const createNewUser = async (req: Request, res: Response) => {
  try {
    const userData: TUser = req.body;

    // check data validation by using zod
    const parsedData = userValidationSchema.parse(userData);

    // parse data pass by services
    const result = await userService.createNewUserService(parsedData);

    // check user is created or failed
    if (result) {
      res.status(200).json({
        success: true,
        message: 'User created successfully!',
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Something went wrong',
        error: {
          code: 404,
          description: 'Failed to create user',
        },
      });
    }
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: 'Something went wrong',
      error: {
        code: 404,
        description: error.message,
      },
    });
  }
};

// Retrieve all user controller
const retrieveAllUsers = async (_req: Request, res: Response) => {
  try {
    const result = await userService.retrieveAllUsersServices();
    if (result) {
      res.status(200).json({
        success: true,
        message: 'User fetched successfully!',
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Something went wrong',
        error: {
          code: 404,
          description: 'No users found',
        },
      });
    }
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: 'Something went wrong',
      error: {
        code: 404,
        description: error.message,
      },
    });
  }
};

// get a specific user
const getUserDetails = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userService.getUserDetailsService(Number(userId));

    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: {
        code: 404,
        description: error.message,
      },
    });
  }
};

// update user data
const updateUserData = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const updateData = req.body;
    const user = await userModel.isUserExists(Number(userId));
    if (user) {
      // marge rest of data and set for update
      const mergedData: TUser = {
        ...user,
        ...updateData,
        password: updateData.password
          ? await bcrypt.hash(
              updateData.password,
              Number(config.bcrypt_salt_rounds)
            )
          : user.password,
      };

      const parseUpdateData = userValidationSchema.parse(mergedData);

      const updatedUser = await userService.updateUserService(
        Number(userId),
        parseUpdateData
      );

      // send response
      if (updatedUser.modifiedCount !== 0) {
        res.status(200).json({
          success: true,
          message: 'User updated successfully!',
          data: null,
        });
      } else {
        res.status(400).json({
          success: false,
          message: 'User already up to date',
          error: {
            code: 404,
            description: 'User already up to date',
          },
        });
      }
    } else {
      throw new Error('User not found');
    }
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: {
        code: 404,
        description: error.message || error,
      },
    });
  }
};

// delete user data
const deleteUserData = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    await userService.deleteUserService(Number(userId));
    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: null,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: {
        code: 404,
        description: error.message,
      },
    });
  }
};

// add new order product
const addOrderToUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const orderData = req.body;
  try {
    // check validation by zod
    const parsedData = orderValidation.parse(orderData);

    const result = await userService.addNewOrderService(
      Number(userId),
      parsedData
    );
    if (result.modifiedCount !== 0) {
      res.status(200).json({
        success: true,
        message: 'Order created successfully!',
        data: null,
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Order already exist',
        error: {
          code: 400,
          description: 'Order already exist',
        },
      });
    }
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: {
        code: 404,
        description: error.message || error,
      },
    });
  }
};

// retrieve all order by a user
const retrieveOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const orders = await userService.retrieveOrdersService(Number(userId));

    res.status(200).json({
      success: true,
      message: 'Order fetched successfully!',
      data: orders,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: {
        code: 404,
        description: error.message,
      },
    });
  }
};


const calculateTotalOrderPrice = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const orders = await userService.calculateTotalOrderPriceService(
      Number(userId)
    );

    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: orders,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: {
        code: 404,
        description: error.message,
      },
    });
  }
};

export const userController = {
  createNewUser,
  retrieveAllUsers,
  getUserDetails,
  updateUserData,
  deleteUserData,
  addOrderToUser,
  retrieveOrders,
  calculateTotalOrderPrice,
};

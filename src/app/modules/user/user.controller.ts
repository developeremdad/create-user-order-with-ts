import { Request, Response } from 'express';
import { TUser } from './user.interface';
import { userService } from './user.services';
import userValidationSchema from './user.validation';

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
        description: error,
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
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'Something went wrong',
      error: {
        code: 404,
        description: error,
      },
    });
  }
};

// get a specific user
const getUserDetails = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userService.getUserDetailsService(userId);

    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'Something went wrong',
      error: {
        code: 404,
        description: error,
      },
    });
  }
};

export const userController = {
  createNewUser,
  retrieveAllUsers,
  getUserDetails,
};

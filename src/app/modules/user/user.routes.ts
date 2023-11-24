import express from 'express';
import { userController } from './user.controller';
const router = express.Router();

router.post('/', userController.createNewUser);
router.get('/', userController.retrieveAllUsers);
router.get('/:userId', userController.getUserDetails);
router.put('/:userId', userController.updateUserData);
// router.put('/:userId/orders', userController.addOrderToUser);
router.delete('/:userId', userController.deleteUserData);

export const userRouter = router;

import express from 'express';
import { userController } from './user.controller';
const router = express.Router();

router.post('/', userController.createNewUser);
router.get('/', userController.retrieveAllUsers);
router.get('/:userId', userController.getUserDetails);
router.put('/:userId', userController.updateUserData);
router.delete('/:userId', userController.deleteUserData);
router.put('/:userId/orders', userController.addOrderToUser);
router.get('/:userId/orders', userController.retrieveOrders);
router.get(
  '/:userId/orders/total-price',
  userController.calculateTotalOrderPrice
);

export const userRouter = router;

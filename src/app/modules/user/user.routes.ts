import express from 'express';
import { userController } from './user.controller';
const router = express.Router();

router.post('/', userController.createNewUser);
router.get('/', userController.retrieveAllUsers);
router.get('/:userId', userController.getUserDetails);

export const userRouter = router;

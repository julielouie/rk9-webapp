import express from 'express';
import * as userController from '../controllers/user.controller';

const router = express.Router();

router.route('/').get(userController.getUserList).post(userController.createUser);

router.route('/me').get(userController.getSelf);

router
  .route('/:id')
  .get(userController.getUser)
  .put(userController.updateUser)
  .delete(userController.updateUser);

export default router;

import express from 'express';
import * as userController from '../controllers/user.controller';
import { ValidationField, parse } from '../middleware/validation.middleware';
import * as userSchema from '../schemas/user.schema';

const router = express.Router();

router
  .route('/')
  .get(parse(userSchema.getUserListQuery, ValidationField.query), userController.getUserList)
  .post(parse(userSchema.postUser, ValidationField.body), userController.createUser);

router.route('/me').get(userController.getSelf);

router
  .route('/:username')
  .get(parse(userSchema.getUserParams, ValidationField.params), userController.getUser)
  .put(
    parse(userSchema.updateUserParams, ValidationField.params),
    parse(userSchema.updateUserBody, ValidationField.body),
    userController.updateUser,
  );

export default router;

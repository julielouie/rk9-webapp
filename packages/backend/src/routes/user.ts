import express from 'express';
import { grantAccess } from '../middleware/auth.middleware';
import * as userController from '../controllers/user.controller';
import { PermissionResource } from '../permissions/permissionResource';

const router = express.Router();

router.route('/sign-up').post(userController.signUp);

router.route('/log-in').post(userController.logIn);

router.route('/log-out').get(userController.logOut);

router.route('/me').get(grantAccess('read', PermissionResource.READ), userController.getSelf);

router
  .route('/')
  .get(userController.getUserList)
  .post(grantAccess('create', PermissionResource.CREATE), userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .put(grantAccess('update', PermissionResource.UPDATE), userController.updateUser)
  .delete(grantAccess('delete', PermissionResource.DELETE), userController.updateUser);

export default router;

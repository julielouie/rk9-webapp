import express from 'express';
import * as userController from '../controllers/user.controller';
import { grantAccess } from '../middleware/auth.middleware';
import { PermissionResource } from '../permissions/permissionResource';

const router = express.Router();

router.route('/sign-up').post(userController.signUp);

router.route('/log-in').post(userController.logIn);

router.route('/log-out').get(userController.logOut);

router.route('/me').get(grantAccess('read', PermissionResource.READ), userController.getSelf);

router.route('/').get(userController.getUserList);

router
  .route('/:id')
  .get(userController.getUser)
  .put(grantAccess('update', PermissionResource.UPDATE_USER), userController.updateUser);

router
  .route('/admin/:id')
  .delete(grantAccess('delete', PermissionResource.DELETE), userController.deleteUser);

export default router;

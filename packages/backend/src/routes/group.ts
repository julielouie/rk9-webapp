import express from 'express';
import * as groupController from '../controllers/group.controller';
import { grantAccess } from '../middleware/auth.middleware';
import { PermissionResource } from '../permissions/permissionResource';

const router = express.Router();

router
  .route('/')
  .get(groupController.getAllGroups)
  .post(grantAccess('create', PermissionResource.CREATE), groupController.createGroup);

router
  .route('/:id')
  .get(groupController.getGroup)
  .put(grantAccess('update', PermissionResource.UPDATE), groupController.updateGroup)
  .delete(grantAccess('delete', PermissionResource.DELETE), groupController.deleteGroup);

export default router;

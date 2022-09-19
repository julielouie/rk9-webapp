import express from 'express';
import * as orderController from '../controllers/order.controller';
import { grantAccess } from '../middleware/auth.middleware';
import { PermissionResource } from '../permissions/permissionResource';

const router = express.Router();

router
  .route('/')
  .get(orderController.getAllOrders)
  .post(grantAccess('create', PermissionResource.CREATE_ORDER), orderController.createOrder);

router
  .route('/:id')
  .get(grantAccess('read', PermissionResource.READ_ORDER), orderController.getOrder)
  .put(grantAccess('update', PermissionResource.UPDATE), orderController.updateOrder)
  .delete(grantAccess('delete', PermissionResource.DELETE), orderController.deleteOrder);

export default router;

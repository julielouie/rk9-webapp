import express from 'express';
import * as postController from '../controllers/post.controller';
import { grantAccess } from '../middleware/auth.middleware';
import { PermissionResource } from '../permissions/permissionResource';

const router = express.Router();

router
  .route('/')
  .get(postController.getAllPosts)
  .post(grantAccess('create', PermissionResource.CREATE_POST), postController.createPost);

router
  .route('/:id')
  .get(postController.getPost)
  .put(grantAccess('update', PermissionResource.UPDATE_POST), postController.updatePost)
  .delete(grantAccess('delete', PermissionResource.DELETE_POST), postController.deletePost);

export default router;

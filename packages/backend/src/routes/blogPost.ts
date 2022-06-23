import express from 'express';
import * as blogPostController from '../controllers/blogPost.controller';
import { grantAccess } from '../middleware/auth.middleware';
import { PermissionResource } from '../permissions/permissionResource';

const router = express.Router();

router
  .route('/')
  .get(blogPostController.getAllBlogPosts)
  .post(grantAccess('create', PermissionResource.CREATE), blogPostController.createBlogPost);

router
  .route('/:id')
  .get(blogPostController.getBlogPost)
  .put(grantAccess('update', PermissionResource.UPDATE), blogPostController.updateBlogPost)
  .delete(grantAccess('delete', PermissionResource.DELETE), blogPostController.deleteBlogPost);

export default router;

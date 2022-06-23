import express from 'express';
import * as testimonialController from '../controllers/testimonial.controller';
import { grantAccess } from '../middleware/auth.middleware';
import { PermissionResource } from '../permissions/permissionResource';

const router = express.Router();

router
  .route('/')
  .get(testimonialController.getAllTestimonials)
  .post(grantAccess('create', PermissionResource.CREATE), testimonialController.createTestimonial);

router
  .route('/:id')
  .get(testimonialController.getTestimonial)
  .put(grantAccess('update', PermissionResource.UPDATE), testimonialController.updateTestimonial)
  .delete(
    grantAccess('delete', PermissionResource.DELETE),
    testimonialController.deleteTestimonial,
  );

export default router;

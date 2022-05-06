import express from 'express';
import * as testimonialController from '../controllers/testimonial.controller';

const router = express.Router();

router
  .route('/')
  .get(testimonialController.getAllTestimonials)
  .post(testimonialController.createTestimonial);

router
  .route('/:id')
  .get(testimonialController.getTestimonial)
  .put(testimonialController.updateTestimonial)
  .delete(testimonialController.deleteTestimonial);

export default router;

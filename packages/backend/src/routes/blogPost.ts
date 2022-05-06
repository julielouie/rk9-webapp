import express from 'express';
import * as blogPostController from '../controllers/blogPost.controller';

const router = express.Router();

router.route('/').get(blogPostController.getAllBlogPosts).post(blogPostController.createBlogPost);

router
  .route('/:id')
  .get(blogPostController.getBlogPost)
  .put(blogPostController.updateBlogPost)
  .delete(blogPostController.deleteBlogPost);

export default router;

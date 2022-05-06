import express from 'express';
import * as postController from '../controllers/post.controller';

const router = express.Router();

router.route('/').get(postController.getAllPosts).post(postController.createPost);

router
  .route('/:id')
  .get(postController.getPost)
  .put(postController.updatePost)
  .delete(postController.deletePost);

export default router;

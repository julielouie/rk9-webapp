import express from 'express';
import * as journalPostController from '../controllers/journalPost.controller';

const router = express.Router();

router
  .route('/')
  .get(journalPostController.getAllJournalPosts)
  .post(journalPostController.createJournalPost);

router
  .route('/:id')
  .get(journalPostController.getJournalPost)
  .put(journalPostController.updateJournalPost)
  .delete(journalPostController.deleteJournalPost);

export default router;

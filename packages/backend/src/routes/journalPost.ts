import express from 'express';
import * as journalPostController from '../controllers/journalPost.controller';
import { grantAccess } from '../middleware/auth.middleware';
import { PermissionResource } from '../permissions/permissionResource';

const router = express.Router();

router
  .route('/')
  .get(journalPostController.getAllJournalPosts)
  .post(grantAccess('create', PermissionResource.CREATE), journalPostController.createJournalPost);

router
  .route('/:id')
  .get(journalPostController.getJournalPost)
  .put(grantAccess('update', PermissionResource.UPDATE), journalPostController.updateJournalPost)
  .delete(
    grantAccess('delete', PermissionResource.DELETE),
    journalPostController.deleteJournalPost,
  );

export default router;

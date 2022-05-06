import express from 'express';
import * as groupController from '../controllers/group.controller';

const router = express.Router();

router.route('/').get(groupController.getAllGroups).post(groupController.createGroup);

router
  .route('/:id')
  .get(groupController.getGroup)
  .put(groupController.updateGroup)
  .delete(groupController.deleteGroup);

export default router;

import express from 'express';
import * as uploadController from '../controllers/upload.controller';

const router = express.Router();

router.route('/:id').post(uploadController.upload);

router.route('/files').get(uploadController.getAllUploads);

router.route('/files/:name').get(uploadController.getUpload);

export default router;

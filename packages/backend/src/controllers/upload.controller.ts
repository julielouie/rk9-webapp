import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { StatusCode } from '../types/common';
import * as uploadService from '../services/upload.service';

export const getAllUploads = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const uploadsList: { name: string; url: string }[] = await uploadService.getAllUploads();
  res.status(StatusCode.success).send(uploadsList);
});

export const getUpload = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const uploadLink = await uploadService.getUpload(req.params.name);
  res.redirect(uploadLink);
});

export const upload = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const createdUpload: string = await uploadService.upload(
    req.params.id,
    req.query.postType,
    req.files,
  );
  res.status(StatusCode.success).send(createdUpload);
});

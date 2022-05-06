import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { IPost } from '../models/post';
import * as postService from '../services/post.service';
import { StatusCode } from '../types/common';

export const getAllPosts = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const postList: IPost[] = await postService.getAllPosts();
  res.status(StatusCode.success).send(postList);
});

export const getPost = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const post: IPost = await postService.getPost(req.params.id);
  res.status(StatusCode.success).send(post);
});

export const createPost = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const createdPost: IPost = await postService.createPost(req.body);
  res.status(StatusCode.success).send(createdPost);
});

export const updatePost = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const updatedPost: IPost = await postService.updatePost(req.params.id, req.body);
  res.status(StatusCode.success).send(updatedPost);
});

export const deletePost = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const deletedPost: IPost = await postService.deletePost(req.params.id);
  res.status(StatusCode.success).send(deletedPost);
});

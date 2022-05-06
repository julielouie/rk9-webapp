import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { IBlogPost } from '../models/blogPost';
import * as blogPostService from '../services/blogPost.service';
import { StatusCode } from '../types/common';

export const getAllBlogPosts = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const blogPostList: IBlogPost[] = await blogPostService.getAllBlogPosts();
  res.status(StatusCode.success).send(blogPostList);
});

export const getBlogPost = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const blogPost: IBlogPost = await blogPostService.getBlogPost(req.params.id);
  res.status(StatusCode.success).send(blogPost);
});

export const createBlogPost = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const createdBlogPost: IBlogPost = await blogPostService.createBlogPost(req.body);
  res.status(StatusCode.success).send(createdBlogPost);
});

export const updateBlogPost = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const updatedBlogPost: IBlogPost = await blogPostService.updateBlogPost(req.params.id, req.body);
  res.status(StatusCode.success).send(updatedBlogPost);
});

export const deleteBlogPost = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const deletedBlogPost: IBlogPost = await blogPostService.deleteBlogPost(req.params.id);
  res.status(StatusCode.success).send(deletedBlogPost);
});

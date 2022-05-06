import { map } from 'p-iteration';
import * as db from '../db/blogPost.db';
import { BlogPostMap } from '../mappers/BlogPostMap';
import { IBlogPost } from '../models/blogPost';

export const getAllBlogPosts = async (): Promise<IBlogPost[]> => {
  const allBlogPosts = await db.getAllBlogPosts();
  return map(allBlogPosts, (blogPost) => BlogPostMap.toSimpleDTO(blogPost));
};

export const getBlogPost = async (id: string): Promise<IBlogPost> => {
  const blogPostInfo = await db.getBlogPost(id);
  return BlogPostMap.toDTO(blogPostInfo);
};

export const createBlogPost = async (payload: any): Promise<IBlogPost> => {
  const createdBlogPost = await db.createBlogPost(payload);
  return BlogPostMap.toDTO(createdBlogPost);
};

export const updateBlogPost = async (id: string, payload: IBlogPost): Promise<IBlogPost> => {
  const updatedBlogPost = await db.updateBlogPost(id, payload);
  return BlogPostMap.toDTO(updatedBlogPost);
};

export const deleteBlogPost = async (id: string): Promise<IBlogPost> => {
  const deletedBlogPost = await db.deleteBlogPost(id);
  return BlogPostMap.toDTO(deletedBlogPost);
};

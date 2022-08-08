import { map } from 'p-iteration';
import * as db from '../db/post.db';
import { PostMap } from '../mappers/PostMap';
import { IPost } from '../models/post';

export const getAllPosts = async (
  page?: number,
  groupId?: string,
  mediaType?: string,
): Promise<IPost[]> => {
  const allPosts = await db.getAllPosts(page, groupId, mediaType);
  return map(allPosts, (post) => PostMap.toSimpleDTO(post));
};

export const getPost = async (id: string): Promise<IPost> => {
  const postInfo = await db.getPost(id);
  return PostMap.toDTO(postInfo);
};

export const createPost = async (payload: any): Promise<IPost> => {
  const createdPost = await db.createPost(payload);
  return PostMap.toDTO(createdPost);
};

export const updatePost = async (id: string, payload: IPost): Promise<IPost> => {
  const updatedPost = await db.updatePost(id, payload);
  return PostMap.toDTO(updatedPost);
};

export const deletePost = async (id: string): Promise<IPost> => {
  const deletedPost = await db.deletePost(id);
  return PostMap.toDTO(deletedPost);
};

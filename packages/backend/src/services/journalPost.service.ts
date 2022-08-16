import { map } from 'p-iteration';
import * as db from '../db/journalPost.db';
import { JournalPostMap } from '../mappers/JournalPostMap';
import { IJournalPost } from '../models/journalPost';
import * as journalPostSchema from '../schemas/journalPost.schema';

export const getAllJournalPosts = async (oneOnOneId?: string): Promise<IJournalPost[]> => {
  const allJournalPosts = await db.getAllJournalPosts(oneOnOneId);
  return map(allJournalPosts, (journalPost) => JournalPostMap.toSimpleDTO(journalPost));
};

export const getJournalPost = async (id: string): Promise<IJournalPost> => {
  const journalPostInfo = await db.getJournalPost(id);
  return JournalPostMap.toDTO(journalPostInfo);
};

export const createJournalPost = async (
  payload: journalPostSchema.PostAndPutJournalPost,
): Promise<IJournalPost> => {
  const createdJournalPost = await db.createJournalPost(payload);
  return JournalPostMap.toDTO(createdJournalPost);
};

export const updateJournalPost = async (
  id: string,
  payload: journalPostSchema.PostAndPutJournalPost,
): Promise<IJournalPost> => {
  const updatedJournalPost = await db.updateJournalPost(id, payload);
  return JournalPostMap.toDTO(updatedJournalPost);
};

export const deleteJournalPost = async (id: string): Promise<IJournalPost> => {
  const deletedJournalPost = await db.deleteJournalPost(id);
  return JournalPostMap.toDTO(deletedJournalPost);
};

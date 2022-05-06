import JournalPostModel, { IJournalPost, IJournalPostDocument } from '../models/journalPost';
import { JournalPostNotFoundException } from '../exceptions/notFoundExceptions';
import * as journalPostSchema from '../schemas/journalPost.schema';

export const getAllJournalPosts = async (): Promise<IJournalPost[]> => {
  const query: any = {};
  const journalPostList: IJournalPost[] = await JournalPostModel.find(query).select('-__v').exec();
  return journalPostList;
};

export const getJournalPost = async (id: string): Promise<IJournalPost> => {
  const journalPost: IJournalPostDocument | null = await JournalPostModel.findOne({ id })
    .select('-__v')
    .exec();
  if (!journalPost) throw new JournalPostNotFoundException(id);

  const result: IJournalPost = journalPost.toObject();
  delete result._id;
  return result;
};

export const createJournalPost = async (
  payload: journalPostSchema.PostAndPutJournalPost,
): Promise<IJournalPost> => {
  const journalPost = new JournalPostModel(payload);
  const savedJournalPost = await journalPost.save();

  const result: IJournalPost = savedJournalPost.toObject();
  delete result._id;
  delete result.__v;
  return result;
};

export const updateJournalPost = async (
  id: string,
  payload: journalPostSchema.PostAndPutJournalPost,
): Promise<IJournalPost> => {
  const journalPost = await JournalPostModel.findOneAndUpdate({ id }, payload, { new: true });
  if (!journalPost) throw new JournalPostNotFoundException(id);

  const result: IJournalPost = journalPost.toObject();
  delete result._id;
  delete result.__v;
  return result;
};

export const deleteJournalPost = async (id: string): Promise<IJournalPost> => {
  const deletedJournalPost = await JournalPostModel.findOne({ id }).exec();
  if (!deletedJournalPost) throw new JournalPostNotFoundException(id);

  return deletedJournalPost.deleteOne();
};

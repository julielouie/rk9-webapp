import JournalPostModel, { IJournalPost, IJournalPostDocument } from '../models/journalPost';
import { JournalPostNotFoundException } from '../exceptions/notFoundExceptions';
import * as journalPostSchema from '../schemas/journalPost.schema';

export const getAllJournalPosts = async (oneOnOneId?: string): Promise<IJournalPost[]> => {
  const query: any = {};
  if (oneOnOneId) query.oneOnOneUserId = oneOnOneId;
  const aggregate: any[] = [{ $match: query }, { $sort: { date: -1 } }];
  const journalPostList: IJournalPost[] = await JournalPostModel.aggregate(aggregate);
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
  journalPost.id = journalPost._id;
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

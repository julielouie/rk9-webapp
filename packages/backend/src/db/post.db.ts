import PostModel, { IPost, IPostDocument } from '../models/post';
import { PostNotFoundException } from '../exceptions/notFoundExceptions';

export const getAllPosts = async (
  page?: number,
  groupId?: string,
  mediaType?: string,
): Promise<IPost[]> => {
  const query: any = {};
  if (groupId) query['group.id'] = groupId;
  if (mediaType) query.mediaType = mediaType;

  const aggregate: any[] = [{ $match: query }, { $sort: { date: -1 } }];
  if (!mediaType) {
    let newPageNumber = 1;
    if (page) newPageNumber = page;
    aggregate.push({ $skip: 5 * (newPageNumber - 1) }, { $limit: 5 });
  }

  const postList: IPost[] = await PostModel.aggregate(aggregate);
  return postList;
};

export const getPost = async (id: string): Promise<IPost> => {
  const post: IPostDocument | null = await PostModel.findOne({ id }).select('-__v').exec();
  if (!post) throw new PostNotFoundException(id);

  const result: IPost = post.toObject();
  delete result._id;
  return result;
};

export const createPost = async (payload: any): Promise<IPost> => {
  const post = new PostModel(payload);
  post.id = post._id;
  const savedPost = await post.save();

  const result: IPost = savedPost.toObject();
  delete result._id;
  delete result.__v;
  return result;
};

export const updatePost = async (id: string, payload: any): Promise<IPost> => {
  const post = await PostModel.findOneAndUpdate({ id }, payload, { new: true });
  if (!post) throw new PostNotFoundException(id);

  const result: IPost = post.toObject();
  delete result._id;
  delete result.__v;
  return result;
};

export const deletePost = async (id: string): Promise<IPost> => {
  const deletedPost = await PostModel.findOne({ id }).exec();
  if (!deletedPost) throw new PostNotFoundException(id);

  return deletedPost.deleteOne();
};

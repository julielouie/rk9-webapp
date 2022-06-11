import PostModel, { IPost, IPostDocument } from '../models/post';
import { PostNotFoundException } from '../exceptions/notFoundExceptions';

export const getAllPosts = async (): Promise<IPost[]> => {
  const query: any = {};
  const postList: IPost[] = await PostModel.find(query).select('-__v').exec();
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

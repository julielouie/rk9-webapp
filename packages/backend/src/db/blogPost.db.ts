import BlogPostModel, { IBlogPost, IBlogPostDocument } from '../models/blogPost';
import { BlogPostNotFoundException } from '../exceptions/notFoundExceptions';

export const getAllBlogPosts = async (): Promise<IBlogPost[]> => {
  const query: any = {};
  const blogPostList: IBlogPost[] = await BlogPostModel.find(query).select('-__v').exec();
  return blogPostList;
};

export const getBlogPost = async (id: string): Promise<IBlogPost> => {
  const blogPost: IBlogPostDocument | null = await BlogPostModel.findOne({ id })
    .select('-__v')
    .exec();
  if (!blogPost) throw new BlogPostNotFoundException(id);

  const result: IBlogPost = blogPost.toObject();
  delete result._id;
  return result;
};

export const createBlogPost = async (payload: any): Promise<IBlogPost> => {
  const blogPost = new BlogPostModel(payload);
  const savedBlogPost = await blogPost.save();

  const result: IBlogPost = savedBlogPost.toObject();
  delete result._id;
  delete result.__v;
  return result;
};

export const updateBlogPost = async (id: string, payload: any): Promise<IBlogPost> => {
  const blogPost = await BlogPostModel.findOneAndUpdate({ id }, payload, { new: true });
  if (!blogPost) throw new BlogPostNotFoundException(id);

  const result: IBlogPost = blogPost.toObject();
  delete result._id;
  delete result.__v;
  return result;
};

export const deleteBlogPost = async (id: string): Promise<IBlogPost> => {
  const deletedBlogPost = await BlogPostModel.findOne({ id }).exec();
  if (!deletedBlogPost) throw new BlogPostNotFoundException(id);

  return deletedBlogPost.deleteOne();
};

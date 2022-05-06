import { IBlogPost } from '../models/blogPost';

export class BlogPostMap {
  static toSimpleDTO(blogPost: IBlogPost): IBlogPost {
    return this.toDTO(blogPost);
  }

  static toDTO(blogPost: IBlogPost): IBlogPost {
    return {
      id: blogPost.id,
      date: blogPost.date,
      title: blogPost.title,
      post: blogPost.post ?? '',
      image: blogPost.image || null,
    };
  }
}

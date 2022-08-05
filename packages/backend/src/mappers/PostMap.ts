import { IPost } from '../models/post';

export class PostMap {
  static toSimpleDTO(post: IPost): IPost {
    return this.toDTO(post);
  }

  static toDTO(post: IPost): IPost {
    return {
      id: post.id,
      user: post.user,
      date: post.date,
      group: post.group,
      oneOnOneUserId: post.oneOnOneUserId || '',
      text: post.text || '',
      media: post.media || null,
      mediaType: post.mediaType || null,
    };
  }
}

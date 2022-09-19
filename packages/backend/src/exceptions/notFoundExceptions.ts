import HttpException from './httpException';

export class NotFoundException extends HttpException {
  constructor(message: string) {
    super(404, message);
  }
}

export class UserNotFoundException extends NotFoundException {
  constructor(id: string) {
    super(`User with id ${id} not found`);
  }
}

export class UserUsernameNotFoundException extends NotFoundException {
  constructor(username: string) {
    super(`User with username ${username} not found`);
  }
}

export class TestimonialNotFoundException extends NotFoundException {
  constructor(id: string) {
    super(`Testimonial with id ${id} not found`);
  }
}

export class GroupNotFoundException extends NotFoundException {
  constructor(id: string) {
    super(`Group with id ${id} not found`);
  }
}

export class OrderNotFoundException extends NotFoundException {
  constructor(id: string) {
    super(`Order with id ${id} not found`);
  }
}

export class BlogPostNotFoundException extends NotFoundException {
  constructor(id: string) {
    super(`Blog post with id ${id} not found`);
  }
}

export class JournalPostNotFoundException extends NotFoundException {
  constructor(id: string) {
    super(`Journal post with id ${id} not found`);
  }
}

export class PostNotFoundException extends NotFoundException {
  constructor(id: string) {
    super(`Post with id ${id} not found`);
  }
}

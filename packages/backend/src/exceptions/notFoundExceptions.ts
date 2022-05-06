import HttpException from './httpException';

export class NotFoundException extends HttpException {
  constructor(message: string) {
    super(404, message);
  }
}

export class UserNotFoundException extends NotFoundException {
  constructor(username: string) {
    super(`User with username ${username} not found`);
  }
}

export class TestimonialNotFoundException extends NotFoundException {
  constructor(id: string) {
    super(`Testimonial with id ${id} not found`);
  }
}

import HttpException from './httpException';

export class BadRequestException extends HttpException {
  constructor(message: string) {
    super(400, message);
  }
}

export class InvalidUploadException extends BadRequestException {
  constructor(message: string) {
    super(`Upload failed, reason: ${message}`);
  }
}

export class UserUsernameAlreadyExistsException extends BadRequestException {
  constructor(username: string) {
    super(`User with username ${username} already exists`);
  }
}

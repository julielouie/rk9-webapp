import HttpException from './httpException';

export class UnauthorizedException extends HttpException {
  constructor(message: string) {
    super(401, message);
  }
}
export class InvalidCredentialsException extends HttpException {
  constructor(id: string) {
    super(401, `Invalid credentials for user ${id}`);
  }
}

export class NoAuthTokenException extends HttpException {
  constructor(id: string) {
    super(400, `No auth token found on user ${id}`);
  }
}

export class UnauthorizedPermissionException extends HttpException {
  constructor(id: string) {
    super(403, `User ${id} is not authorized to perform this function`);
  }
}

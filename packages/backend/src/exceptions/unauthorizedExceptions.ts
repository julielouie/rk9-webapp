import HttpException from './httpException';

export enum AuthorizationExceptionType {
  Model = 'models',
  Program = 'programs',
  RawTemplate = 'rawtemplates',
  Team = 'permissions',
  Template = 'templates',
  Trackable = 'trackables',
  User = 'users',
}
export class UnauthorizedException extends HttpException {
  constructor(message: string) {
    super(401, message);
  }
}

export class InvalidCredentialsException extends UnauthorizedException {
  constructor(accessDeniedErrorMsg: string) {
    super(`invalid credentials, reason: ${accessDeniedErrorMsg}`);
  }
}

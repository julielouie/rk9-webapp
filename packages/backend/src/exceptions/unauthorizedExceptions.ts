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

export class UnauthorizedPermissionException extends HttpException {
  constructor(
    authzExcType: AuthorizationExceptionType,
    username: string,
    programId: string | undefined,
  ) {
    super(
      403,
      `User ${username} is not authorized for ${authzExcType} in the program ${programId}`,
    );
  }
}

export class UnauthorizedCustomPermissionException extends HttpException {
  constructor(message: string) {
    super(403, message);
  }
}

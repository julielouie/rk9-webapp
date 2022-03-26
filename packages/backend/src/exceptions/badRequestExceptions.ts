import HttpException from './httpException';

export class BadRequestException extends HttpException {
  constructor(message: string) {
    super(400, message);
  }
}

export class PayloadValidationException extends BadRequestException {
  constructor(validationErrorMsg: string) {
    super(`payload validation failed, reason: ${validationErrorMsg}`);
  }
}

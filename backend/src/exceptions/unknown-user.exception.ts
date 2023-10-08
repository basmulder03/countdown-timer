import { HttpException, HttpStatus } from '@nestjs/common';

export class UnknownUserException extends HttpException {
  constructor() {
    super('Unknown User', HttpStatus.FORBIDDEN);
  }
}

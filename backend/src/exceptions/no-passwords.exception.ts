import { HttpException, HttpStatus } from '@nestjs/common';

export class NoPasswordsException extends HttpException {
  constructor() {
    super('No Passwords', HttpStatus.FORBIDDEN);
  }
}

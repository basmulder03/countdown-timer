import { HttpException, HttpStatus } from '@nestjs/common';

export class NoEnabledPasswordsException extends HttpException {
  constructor() {
    super('No enabled passwords', HttpStatus.FORBIDDEN);
  }
}

import { HttpException, HttpStatus } from '@nestjs/common';
export class SamePasswordAsPreviousException extends HttpException {
  constructor() {
    super(
      'New password can not be the same as one of the previous 5 passwords',
      HttpStatus.BAD_REQUEST,
    );
  }
}

import { EHTTP } from '../enums/http-status-code';

export default class CustomError extends Error {
  status: number;
  message: string;

  constructor(message: string) {
    super();
    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;
    this.message = message;
    this.status = EHTTP.StatusInternalServerError;
  }
}

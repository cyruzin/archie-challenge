import { EHTTP } from '../enums/http-status-code';

export default class InvoiceError extends Error {
  status: number;

  constructor(message: string) {
    super();
    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;
    this.message = message;
    this.status = EHTTP.StatusInternalServerError;
  }
}

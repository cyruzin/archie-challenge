import { EHTTP } from '../enums/http-status-code';
import CustomError from './custom';

export default class EmptyInvoiceError extends CustomError {
  status: number;

  constructor(message: string) {
    super(message);
    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;
    this.status = EHTTP.StatusBadRequest;
  }
}

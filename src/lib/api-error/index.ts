import httpStatus from 'http-status';

class APIError extends Error {
  status: number
  constructor(message: string, status: number) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.status = status || httpStatus.INTERNAL_SERVER_ERROR;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default APIError;

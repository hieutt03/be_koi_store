import { StatusCodes } from "http-status-codes";

class BadRequestException extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST; // Thiết lập status code cho BadRequest
    this.name = "BadRequestException";
  }
}

export default BadRequestException;

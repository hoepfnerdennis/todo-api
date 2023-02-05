import { HttpException } from "./HttpException";

export class DBException extends HttpException {
  constructor(code: string, message: string) {
    super(500, `${code}: ${message}`);
  }
}

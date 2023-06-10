import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { get } from 'lodash';

@Catch(HttpException)
export class HttpFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionRes = exception.getResponse();

    response.status(status).json({
      success: false,
      time: new Date(),
      data: exception.message,
      message: get(exceptionRes, 'message'),
      status,
      path: request.url,
    });
  }
}

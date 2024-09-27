import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch() // 这里没有指定异常类型，表示捕获所有异常
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | object = 'Internal server error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.getResponse();
      if (typeof message === 'object' && 'message' in message) {
        message = (message as any).message; // 提取出其中的 message 字段
      }
    }

    // 自定义返回体格式
    response.status(status).json({
      code: status, // 使用 code 替代 statusCode
      message: message || '请求异常',
    });
  }
}

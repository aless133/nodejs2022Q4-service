import { Catch, ArgumentsHost, HttpAdapterHost, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { RSLoggerService } from './logger.service';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  @Inject()
  private readonly logger: RSLoggerService;

  catch(exception: unknown, host: ArgumentsHost) {
    if (exception instanceof HttpException) {
      super.catch(exception, host);
    } else {
      const { httpAdapter } = this.httpAdapterHost;
      const ctx = host.switchToHttp();
      const httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
      const responseBody = {
        statusCode: httpStatus,
        message: 'Internal server error',
        timestamp: new Date().toISOString(),
        path: httpAdapter.getRequestUrl(ctx.getRequest()),
      };
      httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);

      this.logger.error(`Caught exception: ${exception}. Exiting process.`);
      process.exit(1);
    }
  }
}

import { Catch, ArgumentsHost, HttpAdapterHost, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { RSLoggerService } from './logger.service';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  @Inject()
  private readonly logger: RSLoggerService;

  catch(exception: Error, host: ArgumentsHost) {
    if (exception instanceof HttpException && exception.getStatus() != 500) {
      super.catch(exception, host);
    } else {
      const requestId = this.logger.generateRequestId();  
      const { httpAdapter } = this.httpAdapterHost;
      const ctx = host.switchToHttp();
      const httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
      const responseBody = {
        statusCode: httpStatus,
        error: 'Internal server error',
        message: exception.message,
        timestamp: new Date().toISOString(),
        //path: httpAdapter.getRequestUrl(ctx.getRequest()),
      };
      httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);

      this.logger.logError(exception, `Filter caught exception: ${exception}. Exit process.`);
      const req = ctx.getRequest();
      const res = ctx.getResponse();
      const str = `${requestId} ${req.method} ${req.url} ${JSON.stringify(req.query)} ${JSON.stringify(req.body)} - ${
        res.statusCode
      }`;
      this.logger.error(str);
      this.logger.verbose(
        `${requestId} ${req.ip} ${req.headers['user-agent'] ?? '<user-agent-not-set>'} ${
          req.headers['authorization'] ?? '<authorization-not-set>'
        }`,
      );
      process.exit(1);
    }
  }
}

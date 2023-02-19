import { Module } from '@nestjs/common';
import { RSLoggerService } from './logger.service';
import { RequestLoggerMiddleware } from './logger.middleware';

@Module({
  providers: [RSLoggerService, RequestLoggerMiddleware],
  exports: [RSLoggerService, RequestLoggerMiddleware],
})
export class LoggerModule {}

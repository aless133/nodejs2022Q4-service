import { Catch, ArgumentsHost, Inject } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { RSLoggerService } from './logger.service';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {

  @Inject()
  private readonly logger:RSLoggerService;
  // constructor(private readonly logger: RSLoggerService) {
  //   super();
  // }

  catch(exception: unknown, host: ArgumentsHost) {
    console.log('AllExceptionsFilter.catch',this.logger);
    this.logger.error('hehe');
    // super.catch(exception, host);
  }
}

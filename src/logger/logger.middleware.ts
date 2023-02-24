import { Injectable, Inject, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { RSLoggerService } from './logger.service';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: RSLoggerService) {}

  async use(req: Request, res: Response, next: NextFunction) {

    req['requestId'] = 'req-'+Math.random().toString(36).substring(2, 6);
    const oldWrite = res.write;
    const oldEnd = res.end;
    let time = Date.now();

    const chunks: any[] = [];

    res.write = (...restArgs: any[]) => {
      chunks.push(Buffer.from(restArgs[0]));
      return oldWrite.apply(res, restArgs);
    };

    res.end = (...restArgs: any[]) => {
      if (restArgs[0]) {
        chunks.push(Buffer.from(restArgs[0]));
      }
      const body = Buffer.concat(chunks).toString('utf8');
      this.logger.verbose('Response body: '+body);
      return oldEnd.apply(res, restArgs);
    };

    next();

    time = Date.now() - time;   
    const str = `${req.url} ${JSON.stringify(req.query)} ${JSON.stringify(req.body)} - ${res.statusCode} - ${time}ms`;
    if (res.statusCode>=500 && res.statusCode<=599)
      this.logger.error(str);
    else if (res.statusCode>=400 && res.statusCode<=499)
      this.logger.warn(str);
    else
      this.logger.log(str);
    this.logger.debug(`${req.ip} ${req.headers['user-agent']}`);
  }
}

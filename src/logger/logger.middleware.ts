import { Injectable, Inject, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { RSLoggerService } from './logger.service';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: RSLoggerService) {}

  async use(req: Request, res: Response, next: NextFunction) {

    let time = Date.now();
    const requestId = 'req-'+Math.random().toString(36).substring(2, 6);
    const oldWrite = res.write;
    const oldEnd = res.end;
    const chunks: any[] = [];

    res.write = (...restArgs: any[]) => {
      chunks.push(Buffer.from(restArgs[0]));
      return oldWrite.apply(res, restArgs);
    };

    res.end = (...restArgs: any[]) => {
      if (restArgs[0]) {
        chunks.push(Buffer.from(restArgs[0]));
      }
      return oldEnd.apply(res, restArgs);
    };

    res.on('finish',()=>{
      time = Date.now() - time;   
      const str = `${requestId} ${req.method} ${req.url} ${JSON.stringify(req.query)} ${JSON.stringify(req.body)} - ${res.statusCode} - ${time}ms`;
      if (res.statusCode>=500 && res.statusCode<=599)
        this.logger.error(str);
      else if (res.statusCode>=400 && res.statusCode<=499)
        this.logger.warn(str);
      else
        this.logger.log(str);
      // this.logger.log(JSON.stringify(req.headers));
      this.logger.verbose(`${requestId} ${req.ip} ${req.headers['user-agent']??'<user-agent-not-set>'} ${req.headers['authorization']??'<authorization-not-set>'}`);
      const body = Buffer.concat(chunks).toString('utf8');
      this.logger.debug(`${requestId} Response body: ${body}`);
    })

    next();
  }
}

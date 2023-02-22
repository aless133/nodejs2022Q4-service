import { Injectable, LoggerService, Inject, OnModuleInit } from '@nestjs/common';
import { createWriteStream, WriteStream } from 'node:fs';
import { Request } from 'express';

const levels = ['error', 'warn', 'log', 'verbose', 'debug'];

@Injectable()
export class RSLoggerService implements LoggerService, OnModuleInit {
  level: number;
  logFile: WriteStream;
  logErrorFile: WriteStream;
  requestId: string;

  constructor(@Inject('REQUEST') private readonly request: Request) {
    console.log('RSLoggerService construct');
    this.requestId = 'req-'+Math.random().toString(36).substring(2, 6);
    this.level = levels.indexOf(process.env.LOGGER_LEVEL || 'log');
    this.logFile = createWriteStream('./logs/app.log', { flags: 'a' });
    this.logErrorFile = createWriteStream('./logs/error.log', { flags: 'a' });
  }

  onModuleInit(): any {
    console.log('RSLoggerService onModuleInit');
  }

  error(message: any, ...optionalParams: any[]) {
    return this.add(0, 'ERR '+message.toString());
  }
  warn(message: any, ...optionalParams: any[]) {
    return this.add(1, 'WRN '+message.toString());
  }
  log(message: any, ...optionalParams: any[]) {
    return this.add(2, 'LOG '+message.toString());
  }
  verbose(message: any, ...optionalParams: any[]) {
    return this.add(3, 'VRB '+message.toString());
  }
  debug(message: any, ...optionalParams: any[]) {
    return this.add(4, 'DBG '+message.toString());
  }
  
  add(level: number, message: string) {
    if (level > this.level) return false;
    const msg = new Date().toISOString() + ' ' + this.requestId + ' ' + message + '\n';
    process.stdout.write(msg);
    this.writeToFile(this.logFile, msg);
    if (level == 0) {
      this.writeToFile(this.logErrorFile, msg);
    }
    return true;
  }

  writeToFile(stream: WriteStream, msg: string) {
    stream.write(msg);
    // const initialPos = fileWriteStream.tell();
    // // Write some data to the stream
    // fileWriteStream.write('Hello World!');
    // const size = fileWriteStream.tell() - initialPos;
    // console.log(`File size: ${size} bytes`);
  }
}

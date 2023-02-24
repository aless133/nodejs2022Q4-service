import { Injectable, LoggerService, Inject, Scope } from '@nestjs/common';
import { statSync, renameSync, appendFile } from 'node:fs';
import { Request } from 'express';

const levels = ['error', 'warn', 'log', 'verbose', 'debug'];

@Injectable()
export class RSLoggerService implements LoggerService {
  level: number;

  // constructor(@Inject('REQUEST') readonly req: Request) {
  constructor() {
    this.level = levels.indexOf(process.env.LOGGER_LEVEL || 'log');
  }

  logFileName(error: boolean, suffix?: number | string) {
    return './logs/' + (error ? 'error' : 'app') + (suffix ? '-' + suffix : '') + '.log';
  }

  error(message: any, ...optionalParams: any[]) {
    return this.add(0, 'ERR ' + message.toString());
  }
  warn(message: any, ...optionalParams: any[]) {
    return this.add(1, 'WRN ' + message.toString());
  }
  log(message: any, ...optionalParams: any[]) {
    return this.add(2, 'LOG ' + message.toString());
  }
  verbose(message: any, ...optionalParams: any[]) {
    return this.add(3, 'VRB ' + message.toString());
  }
  debug(message: any, ...optionalParams: any[]) {
    return this.add(4, 'DBG ' + message.toString());
  }
  add(level: number, message: string) {
    if (level > this.level) return false;
    // const msg = new Date().toISOString() + ' ' + this.req['requestId'] + ' ' + message + '\n';
    const msg = new Date().toISOString() + ' ' + message + '\n';
    process.stdout.write(msg);
    this.writeToFile(false, msg);
    if (level == 0) {
      this.writeToFile(true, msg);
    }
    return true;
  }

  writeToFile(error: boolean, msg: string) {
    const fileName = this.logFileName(error);
    try {
      const stats = statSync(fileName);
      if (stats.size / 1024 > parseInt(process.env.LOGGER_FILE_SIZE || '0', 10)) {
        renameSync(fileName, this.logFileName(error, Date.now()));
      }
    } catch (err) {
      //no file - no problem
    }
    appendFile(fileName, msg, () => {});
  }
}

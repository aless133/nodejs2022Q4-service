import * as dotenv from 'dotenv';
dotenv.config();
import 'reflect-metadata';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthGuard } from './auth/auth.guard';
import { RSLoggerService } from './logger/logger.service';
import { ValidationPipe } from '@nestjs/common';

import { parse as yamlParse } from 'yaml';
import { readFile } from 'fs/promises';
import { SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const loggerService = app.get(RSLoggerService);
  process.on('uncaughtException', (err, origin) => {
    loggerService.error(`Caught exception: ${err}. Exception origin: ${origin}. Exiting process.`);
    process.exit(1);
  });
  process.on('unhandledRejection', (reason, promise) => {
    loggerService.warn(`Unhandled Rejection: ${reason}`);
  });
  // throw new Error('top level throw');

  app.useGlobalGuards(new AuthGuard());

  const file = await readFile('./doc/api.yaml', 'utf8');
  const document = yamlParse(file);
  SwaggerModule.setup('doc', app, document);

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true }));
  await app.listen(parseInt((process.env.PORT || '4000') as string));
}
bootstrap();

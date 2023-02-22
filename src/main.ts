import * as dotenv from 'dotenv';
dotenv.config();
import 'reflect-metadata';

import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { RSLoggerService } from './logger/logger.service';
import { AllExceptionsFilter } from './logger/exception.filter';
import { ValidationPipe } from '@nestjs/common';

import { parse as yamlParse } from 'yaml';
import { readFile } from 'fs/promises';
import { SwaggerModule } from '@nestjs/swagger';

// process.on('unhandledRejection', (error) => {
//   console.log('handle the error...', error);
// });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // const loggerService = app.get(RSLoggerService);
  // console.log('qqqq',loggerService, typeof RSLoggerService);
  // process.on('unhandledRejection', (error) => {
  //   loggerService.error('An unhandled rejection occurred', error);
  //   process.exit(1);
  // });  

  // const { httpAdapter } = app.get(HttpAdapterHost);
  // app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));  

  const logger = app.get<RSLoggerService>(RSLoggerService);
  app.useLogger(logger);
  

  const file = await readFile('./doc/api.yaml', 'utf8');
  const document = yamlParse(file);
  SwaggerModule.setup('doc', app, document);

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true }));
  await app.listen(parseInt((process.env.PORT || '4000') as string));
}
bootstrap();


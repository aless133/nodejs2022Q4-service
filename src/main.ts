import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

import { readFile } from 'fs/promises';
import { join } from 'path';
import { SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const document = JSON.parse((await readFile(join(process.cwd(), 'doc/api.json'))).toString('utf-8'));
  SwaggerModule.setup('doc', app, document);

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true }));
  await app.listen(parseInt((process.env.PORT || '4000') as string));
}
bootstrap();

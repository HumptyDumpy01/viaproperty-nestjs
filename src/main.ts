import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from '../transform.interceptor';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as process from 'node:process';

dotenv.config({
  // path to .env.config
  path: `${__dirname}/config.env`,
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT || 3000);
}

bootstrap();

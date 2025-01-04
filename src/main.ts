import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from '../transform.interceptor';
import { ValidationPipe } from '@nestjs/common';
import * as process from 'node:process';

/*dotenv.config({
  // path to .env.config
  path: `${__dirname}/config.env`,
});*/

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());

  app.enableCors({
    origin: process.env.ALLOWED_HOST,
  });

  await app.listen(process.env.NEST_PORT || 3001);
}

bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as process from 'node:process';

/*dotenv.config({
  // path to .env.config
  path: `${__dirname}/config.env`,
});*/

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  /* IMPORTANT: THESE LINES OF CODE BLOCKED MY WEBSOCKET CONNECTION. GARN IT! */
  /*app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));*/

  app.enableCors({
    origin: `*`,
  });

  await app.listen(process.env.NEST_PORT || 3001);
}

bootstrap();

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config({
  // path to .env.config
  path: `${__dirname}/../../config.env`,
});

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: `mongodb`,
      url: `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@viaproperty.ez3sz.mongodb.net/viaproperty?retryWrites=true&w=majority&appName=viaproperty`,
      synchronize: true,
      useUnifiedTopology: true,
      entities: [],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

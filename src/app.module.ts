import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { PropertyModule } from './property/property.module';
import { Property } from './property/property.entity';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/user.entity';

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
      entities: [Property, User],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    PropertyModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

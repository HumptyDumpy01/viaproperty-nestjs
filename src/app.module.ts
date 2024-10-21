import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { PropertyModule } from './property/property.module';
import { Property } from './property/property.entity';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/user.entity';
import { PropertyRefundModule } from './property-refund/property-refunds.module';
import { PropertyRefund } from './property-refund/property-refunds.entity';
import { ReportedErrors404Module } from './reported-errors-404/reported-errors-404.module';
import { ReportedErrors404 } from './reported-errors-404/reported-errors-404.entity';
import { ReportedErrors500Module } from './reported-errors-500/reported-errors-500.module';
import { ReportedErrors500 } from './reported-errors-500/reported-errors-500.entity';
import { NewsletterModule } from './newsletter/newsletter.module';
import { Newsletter } from './newsletter/newsletter.entity';

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
      entities: [
        Property,
        User,
        PropertyRefund,
        ReportedErrors404,
        ReportedErrors500,
        Newsletter,
      ],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    PropertyModule,
    AuthModule,
    PropertyRefundModule,
    ReportedErrors404Module,
    ReportedErrors500Module,
    NewsletterModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

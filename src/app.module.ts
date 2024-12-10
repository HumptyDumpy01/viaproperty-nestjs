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
import { PropertyCommentsModule } from './property-comments/property-comments.module';
import { PropertyComments } from './property-comments/property-comments.entity';
import { PropertyQuestionsModule } from './property-questions/property-questions.module';
import { PropertyQuestions } from './property-questions/property-questions.entity';
import { OrderModule } from './order/order.module';
import { Order } from './order/order.entity';

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
        PropertyComments,
        PropertyQuestions,
        Order,
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
    PropertyCommentsModule,
    PropertyQuestionsModule,
    OrderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

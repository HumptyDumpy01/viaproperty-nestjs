import { Module } from '@nestjs/common';
import { ReportedErrors404Service } from './reported-errors-404.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportedErrors404 } from './reported-errors-404.entity';
import { ReportedErrors404Resolver } from './reported-errors-404.resolver';

@Module({
  providers: [ReportedErrors404Service, ReportedErrors404Resolver],
  imports: [TypeOrmModule.forFeature([ReportedErrors404])],
})
export class ReportedErrors404Module {}

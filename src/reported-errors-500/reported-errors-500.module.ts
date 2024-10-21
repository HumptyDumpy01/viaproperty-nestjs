import { Module } from '@nestjs/common';
import { ReportedErrors500Service } from './reported-errors-500.service';
import { ReportedErrors500 } from './reported-errors-500.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportedErrors500Resolver } from './reported-errors-500.resolver';

@Module({
  providers: [ReportedErrors500Service, ReportedErrors500Resolver],
  imports: [TypeOrmModule.forFeature([ReportedErrors500])],
})
export class ReportedErrors500Module {}

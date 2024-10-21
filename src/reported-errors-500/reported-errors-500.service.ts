import { Injectable } from '@nestjs/common';
import { ReportedErrors500 } from './reported-errors-500.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuid } from 'uuid';
import { ReportedErrors500Input } from './reported-errors-500.input';

@Injectable()
export class ReportedErrors500Service {
  constructor(
    @InjectRepository(ReportedErrors500)
    private reportedErrors500Repository: Repository<ReportedErrors500>,
  ) {}

  async createReport500(
    reportedErrorsInput: ReportedErrors500Input,
  ): Promise<ReportedErrors500> {
    const { userMessage, errorStack } = reportedErrorsInput;
    const newReport = this.reportedErrors500Repository.create({
      userMessage,
      id: uuid(),
      createdAt: new Date().toISOString(),
      errorStack,
    });

    return await this.reportedErrors500Repository.save(newReport);
  }
}

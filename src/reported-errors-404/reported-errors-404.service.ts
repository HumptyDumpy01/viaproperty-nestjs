import { Injectable } from '@nestjs/common';
import { ReportedErrors404 } from './reported-errors-404.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ReportedErrors404Input } from './reported-errors-404.input';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ReportedErrors404Service {
  constructor(
    @InjectRepository(ReportedErrors404)
    private reportedErrors404Repository: Repository<ReportedErrors404>,
  ) {}

  async createReport404(
    reportedErrors404Input: ReportedErrors404Input,
  ): Promise<ReportedErrors404> {
    const { userMessage } = reportedErrors404Input;
    const newReport = this.reportedErrors404Repository.create({
      userMessage,
      id: uuid(),
      createdAt: new Date().toISOString(),
      errorStack: new Error().stack,
    });

    return await this.reportedErrors404Repository.save(newReport);
  }
}

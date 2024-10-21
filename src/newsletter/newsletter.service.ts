import { Injectable } from '@nestjs/common';
import { Newsletter } from './newsletter.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { NewsletterInput } from './newsletter.input';
import { v4 as uuid } from 'uuid';

@Injectable()
export class NewsletterService {
  constructor(
    @InjectRepository(Newsletter)
    private newsletterRepository: Repository<Newsletter>,
  ) {}

  async addNewUserToNewsletterCollection(
    newsletterInput: NewsletterInput,
  ): Promise<Newsletter> {
    const { email } = newsletterInput;
    const newsletter = this.newsletterRepository.create({
      id: uuid(),
      email,
      createdAt: new Date(),
    });
    return this.newsletterRepository.save(newsletter);
  }
}

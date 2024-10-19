import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UserInput } from './user.input';
import { AuthMethodEnum } from './enums/auth-method.enum';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(userInput: UserInput): Promise<void> {
    const userData = {
      ...userInput,
      status: UserStatusEnum.USER,
      authMethod: userInput.authMethod as AuthMethodEnum, // Ensure correct type
    };
    const newUser = this.userRepository.create(userData);
    await this.userRepository.save(newUser);
    return;
  }
}

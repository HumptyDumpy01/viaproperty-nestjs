import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UserInput } from './user.input';
import { AuthMethodEnum } from './enums/auth-method.enum';
import * as bcrypt from 'bcrypt';
import { UserStatusEnum } from './enums/user-status.enum';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(
    userInput: UserInput,
    confirmPassword: string,
  ): Promise<void> {
    const { password } = userInput;

    if (password !== confirmPassword) {
      throw new NotAcceptableException(`Passwords do not match`);
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const userData = {
      ...userInput,
      status: UserStatusEnum.USER,
      password: hashedPassword,
      authMethod: userInput.authMethod as AuthMethodEnum, // Ensure correct type
      balance: { total: 0 },
    };

    const newUser = this.userRepository.create(userData);
    await this.userRepository.save(newUser);
    return;
  }
}

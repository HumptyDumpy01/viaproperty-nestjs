import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UserInput } from './user.input';
import { AuthMethodEnum } from './enums/auth-method.enum';
import * as bcrypt from 'bcrypt';
import { UserStatusEnum } from './enums/user-status.enum';
import { v4 as uuid } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getUserData(id: string): Promise<User> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async createUser(
    userInput: UserInput,
    confirmPassword: string,
  ): Promise<User> {
    const { email, initials, password } = userInput;

    if (password !== confirmPassword) {
      throw new NotAcceptableException(`Passwords do not match`);
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const userData = {
      id: uuid(),
      email,
      initials,
      password: hashedPassword,
      status: UserStatusEnum.USER,
      authMethod: AuthMethodEnum.PASSWORD,
      createdAt: new Date().toISOString(),
      online: false,
      adverts: [],
      wishlist: [],
      purchases: [],
      active: true,
      balance: { total: 0 },
      pendingRequests: [],
      rejectedRequests: [],
      completedDeals: [],
      favoriteChats: [],
      blockedUsers: [],
      activity: [],
    };

    const newUser = this.userRepository.create(userData);
    await this.userRepository.save(newUser);
    return newUser;
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.model';
import { UserInput } from './dto/user.input';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  findOneById(userId: number): Promise<User> {
    return this.usersRepository.findOne(userId);
  }

  async create(params: UserInput) {
    const user = this.usersRepository.create(params);
    return await this.usersRepository.save(user);
  }
}

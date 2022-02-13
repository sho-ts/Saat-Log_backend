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

  async read(userId: string): Promise<User> {
    return await this.usersRepository.findOne({
      userId,
      deletedAt: null
    });
  }

  async create(params: UserInput) {
    const user = this.usersRepository.create(params);

    return await this.usersRepository.save(user);
  }

  async update(params: UserInput) {
    const user = await this.usersRepository.findOne(params.userId);
    user.name = user.name;
    user.photoUrl = params.photoURL ?? user.photoUrl;

    return await this.usersRepository.save(user);
  }

  async delete(userId: string) {
    const user = await this.usersRepository.findOne(userId);

    if (!user) return false;

    user.deletedAt = new Date();
    await this.usersRepository.save(user);

    return true;
  }
}

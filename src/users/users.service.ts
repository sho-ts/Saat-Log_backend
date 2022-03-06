import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.model';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { ulid } from 'ulid';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async read(authId: string, userId?: string): Promise<User> {
    return userId
      ? await this.usersRepository.findOne({
          userId,
          deletedAt: null,
        })
      : await this.usersRepository.findOne({
          authId,
          deletedAt: null,
        });
  }

  async create(params: CreateUserInput) {
    const user = this.usersRepository.create({
      ...params,
      userId: ulid(),
    });

    return await this.usersRepository.save(user);
  }

  async update(params: UpdateUserInput) {
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

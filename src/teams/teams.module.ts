import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './team.model';

@Module({
  imports: [TypeOrmModule.forFeature([Team])]
})
export class TeamsModule { }

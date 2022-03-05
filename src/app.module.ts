import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { TeamsModule } from './teams/teams.module';
import { TasksModule } from './tasks/tasks.module';
import { DayTasksModule } from './day-tasks/day-tasks.module';
import { Team } from './teams/team.model';
import { Task } from './tasks/task.model';
import { User } from './users/user.model';
import { DayTask } from './day-tasks/day-task.model';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
      },
      cors: {
        origin: process.env.APP_SITE_URL,
        credentials: true,
      }
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mysql',
      username: 'root',
      password: 'root',
      database: 'database',
      entities: [User, Team, Task, DayTask],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    TeamsModule,
    TasksModule,
    DayTasksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

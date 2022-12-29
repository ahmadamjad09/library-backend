import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities/users.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [UsersController],
  providers: [UsersService,
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthorizationGuard,
    // },
  ]
})
export class UsersModule {}

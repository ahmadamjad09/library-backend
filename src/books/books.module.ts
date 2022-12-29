import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Books } from 'src/entities/books.entity';
import { Users } from 'src/entities/users.entity';
import { UsersController } from 'src/users/users.controller';
import { UsersService } from 'src/users/users.service';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';

@Module({
  imports: [TypeOrmModule.forFeature([Books,Users])],
  controllers: [BooksController],
  providers: [BooksService,UsersService]
})
export class BooksModule {}

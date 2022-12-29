import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities/users.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MailerModule } from '@nestjs-modules/mailer';  

@Module({
  imports: [TypeOrmModule.forFeature([Users]),
  MailerModule.forRoot({
    transport: {
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // upgrade later with STARTTLS
      auth: {
        user: "sender_email",
        pass: "app_pass",
      },
    },
    defaults: {
      from:'"sameer" <sender_email>',
    }
  }),],
  controllers: [UsersController],
  providers: [UsersService,
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthorizationGuard,
    // },
  ]
})
export class UsersModule {}

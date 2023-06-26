import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [UsersModule, TypeOrmModule.forFeature([User])],
})
export class AuthModule {}

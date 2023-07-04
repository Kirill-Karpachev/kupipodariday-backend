import { IsNumber, IsString, IsDate, IsEmail } from 'class-validator';
import { User } from '../entities/user.entity';

export class SignupUserDto {
  @IsNumber()
  id: number;

  @IsString()
  username: string;

  @IsString()
  about: string;

  @IsString()
  avatar: string;

  @IsEmail()
  email: string;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;

  static getSignupUser(user: User): SignupUserDto {
    const { id, username, about, avatar, email, createdAt, updatedAt } = user;
    return {
      id,
      username,
      about,
      avatar,
      email,
      createdAt,
      updatedAt,
    };
  }
}

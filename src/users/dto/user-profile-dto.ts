import { IsEmail, IsNumber, IsString, IsDate } from 'class-validator';
import { User } from '../entities/user.entity';

export class UserProfileDto {
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

  static getUserProfile(user: User): UserProfileDto {
    const { id, username, avatar, email, about, createdAt, updatedAt } = user;
    return {
      id,
      username,
      avatar,
      about,
      email,
      createdAt,
      updatedAt,
    };
  }
}

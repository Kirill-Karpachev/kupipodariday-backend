import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Length, IsString, IsEmail, IsDate } from 'class-validator';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsString()
  @Length(2, 30)
  username: string;

  @Column({ default: 'Пока ничего не рассказал о себе' })
  @Length(2, 200)
  @IsString()
  about: string;

  @Column({ default: 'https://i.pravatar.cc/300' })
  @IsString()
  avatar: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  @IsString()
  password: string;

  @Column()
  wishes: string;

  @Column()
  offers: string;

  @Column()
  wishlists: string;

  @CreateDateColumn()
  @IsDate()
  createdAt: Date;

  @UpdateDateColumn()
  @IsDate()
  updateAt: Date;
}

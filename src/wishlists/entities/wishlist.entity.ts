import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Length, IsString, IsUrl, IsDate } from 'class-validator';

@Entity('wishlists')
export class Wishlist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(1, 250)
  @IsString()
  name: string;

  @Column()
  @Length(0, 1500)
  @IsString()
  description: string;

  @Column()
  @IsUrl()
  image: string;

  @Column()
  items: string;

  @CreateDateColumn()
  @IsDate()
  createdAt: Date;

  @UpdateDateColumn()
  @IsDate()
  updateAt: Date;
}

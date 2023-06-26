import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Length, IsString, IsUrl, IsDate } from 'class-validator';

@Entity('wishes')
export class Wish {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  @Length(1, 250)
  name: string;

  @Column()
  @IsUrl()
  link: string;

  @Column()
  @IsUrl()
  image: string;

  @Column({ type: 'numeric', scale: 2 })
  price: number;

  @Column({ type: 'numeric', scale: 2, default: 0 })
  raised: number;

  @Column()
  owner: string;

  @Column()
  @Length(1, 1024)
  @IsString()
  description: string;

  @Column()
  offers: string;

  @Column({ type: 'int', default: 0 })
  copied: number;

  @CreateDateColumn()
  @IsDate()
  createdAt: Date;

  @UpdateDateColumn()
  @IsDate()
  updateAt: Date;
}

import { IsNotEmpty, IsString } from 'class-validator';
import { Exclude } from 'class-transformer';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4
  @Column()
  login: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  version: number; // integer number, increments on update

  @Column({ type: 'int8' })
  createdAt: number; // timestamp of creation

  @Column({ type: 'int8' })
  updatedAt: number; // timestamp of last update

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}

export class UserCreateDto {
  @IsString()
  @IsNotEmpty()
  login: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class UserUpdateDto {
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @IsString()
  @IsNotEmpty()
  newPassword: string;
}

import { IsString} from 'class-validator';
import { Exclude } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class User {
  @ApiProperty()
  id: string; // uuid v4
  @ApiProperty()
  login: string;
  
  @Exclude()
  password: string;
  
  @ApiProperty()
  version: number; // integer number, increments on update
  @ApiProperty()
  createdAt: number; // timestamp of creation
  @ApiProperty()
  updatedAt: number; // timestamp of last update

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }  
}

export class UserCreateDto {
  @ApiProperty()
  @IsString()
  login: string;
  
  @ApiProperty()
  @IsString()
  password: string;
}

export class UserUpdateDto {
  @ApiProperty()
  @IsString()
  oldPassword: string;
  
  @ApiProperty()
  @IsString()
  newPassword: string;
}


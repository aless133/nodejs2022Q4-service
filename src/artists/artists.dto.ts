import { IsString, IsBoolean, IsNotEmpty } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'artists' })
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column()
  name: string;

  @Column()
  grammy: boolean;

  constructor(partial: Partial<Artist>) {
    Object.assign(this, partial);
  }
}

export class ArtistDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsBoolean()
  grammy: boolean;
}

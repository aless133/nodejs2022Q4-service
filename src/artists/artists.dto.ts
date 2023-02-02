import { IsString, IsBoolean } from 'class-validator';

export class Artist {
  @IsString()
  id: string; // uuid v4

  @IsString()
  name: string;

  @IsBoolean()
  grammy: boolean;

  constructor(partial: Partial<Artist>) {
    Object.assign(this, partial);
  }    
}

export class ArtistDto {
  @IsString()
  name: string;

  @IsBoolean()
  grammy: boolean;
}


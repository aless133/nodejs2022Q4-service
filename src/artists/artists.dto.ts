import { IsString, IsBoolean, IsNotEmpty } from 'class-validator';

export class Artist {
  id: string; // uuid v4
  name: string;
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


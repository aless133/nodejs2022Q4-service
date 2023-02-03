import { IsString, IsInt, IsOptional } from 'class-validator';

export class Album {
  @IsString()
  id: string; // uuid v4

  @IsString()
  name: string;

  @IsInt()
  year: number;

  @IsString()
  @IsOptional()
  artistId: string | null; // refers to Artist

  constructor(partial: Partial<Album>) {
    Object.assign(this, partial);
  }    
}

export class AlbumDto {
  @IsString()
  name: string;

  @IsInt()
  year: number;

  @IsString()
  @IsOptional()
  artistId: string | null; // refers to Artist
}


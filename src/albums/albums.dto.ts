import { IsString, IsInt, IsOptional, IsNotEmpty, IsPositive, IsUUID } from 'class-validator';

export class Album {
  id: string; // uuid v4
  name: string;
  year: number;
  artistId: string | null; // refers to Artist

  constructor(partial: Partial<Album>) {
    Object.assign(this, partial);
  }
}

export class AlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsPositive()
  year: number;

  @IsUUID()
  @IsOptional()
  artistId: string | null; // refers to Artist
}

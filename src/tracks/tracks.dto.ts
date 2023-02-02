import { IsString, IsInt, IsOptional } from 'class-validator';

export class Track {
  @IsString()
  id: string; // uuid v4

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  artistId: string | null; // refers to Artist

  @IsString()
  @IsOptional()
  albumId: string | null; // refers to Album

  @IsInt()
  duration: number; // integer number

  constructor(partial: Partial<Track>) {
    Object.assign(this, partial);
  }    
}

export class TrackDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  artistId: string | null; // refers to Artist

  @IsString()
  @IsOptional()
  albumId: string | null; // refers to Album

  @IsInt()
  duration: number; // integer number
}


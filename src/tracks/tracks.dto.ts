import { IsUUID, IsString, IsInt, IsNotEmpty, IsPositive, ValidateIf } from 'class-validator';

export class Track {
  id: string; // uuid v4
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  duration: number; // integer number

  constructor(partial: Partial<Track>) {
    Object.assign(this, partial);
  }
}

export class TrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @ValidateIf((object, value) => value !== null)
  @IsUUID()
  artistId: string | null; // refers to Artist
  
  @ValidateIf((object, value) => value !== null)
  @IsUUID()
  albumId: string | null; // refers to Album

  @IsInt()
  @IsPositive()
  duration: number; // integer number
}

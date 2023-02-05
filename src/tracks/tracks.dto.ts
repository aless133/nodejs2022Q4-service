import { IsString, IsInt, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Track {
  @ApiProperty()
  @IsString()
  id: string; // uuid v4

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  artistId: string | null; // refers to Artist

  @ApiProperty()
  @IsString()
  @IsOptional()
  albumId: string | null; // refers to Album

  @ApiProperty()
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


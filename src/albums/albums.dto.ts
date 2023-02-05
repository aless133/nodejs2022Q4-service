import { IsString, IsInt, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Album {
  @ApiProperty()
  @IsString()
  id: string; // uuid v4

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsInt()
  year: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  artistId: string | null; // refers to Artist

  constructor(partial: Partial<Album>) {
    Object.assign(this, partial);
  }    
}

export class AlbumDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsInt()
  year: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  artistId: string | null; // refers to Artist
}


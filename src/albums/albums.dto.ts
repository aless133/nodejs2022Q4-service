import { IsString, IsInt, IsNotEmpty, IsPositive, IsUUID, ValidateIf } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Track } from 'src/tracks/tracks.dto';
import { Artist } from 'src/artists/artists.dto';

@Entity({ name: 'albums' })
export class Album {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column()
  name: string;

  @Column()
  year: number;

  @Column({ nullable: true })
  artistId: string | null; // refers to Artist

  @ManyToOne((type) => Artist, (artist) => artist.albums)
  artist: Promise<Artist>;

  @OneToMany((type) => Track, (track) => track.album)
  tracks: Promise<Track[]>;

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

  @ValidateIf((object, value) => value !== null)
  @IsUUID()
  artistId: string | null; // refers to Artist
}

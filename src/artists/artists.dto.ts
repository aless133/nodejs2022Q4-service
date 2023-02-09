import { IsString, IsBoolean, IsNotEmpty } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Track } from 'src/tracks/tracks.dto';
import { Album } from 'src/albums/albums.dto';

@Entity({ name: 'artists' })
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column()
  name: string;

  @Column()
  grammy: boolean;

  @OneToMany(() => Track, (track) => track.artist)
  tracks: Promise<Track[]>;

  @OneToMany(() => Album, (album) => album.artist)
  albums: Promise<Album[]>;

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

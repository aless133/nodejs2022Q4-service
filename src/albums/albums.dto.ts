import { IsString, IsInt, IsNotEmpty, IsPositive, IsUUID, ValidateIf } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, OneToOne } from 'typeorm';
import { Track } from 'src/tracks/tracks.dto';
import { Artist } from 'src/artists/artists.dto';
import { Fav } from 'src/favs/favs.dto';

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

  @ManyToOne(() => Artist, (artist) => artist.albums)
  artist: Promise<Artist>;

  @OneToMany(() => Track, (track) => track.album)
  tracks: Promise<Track[]>;

  @OneToOne((type) => Fav, (fav) => fav.artist)
  fav: Promise<Fav>;  

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

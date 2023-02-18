import { IsUUID, IsString, IsInt, IsNotEmpty, IsPositive, ValidateIf } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { Artist } from 'src/artists/artists.dto';
import { Album } from 'src/albums/albums.dto';
import { Fav } from 'src/favs/favs.dto';

@Entity({ name: 'tracks' })
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column()
  name: string;

  @Column({ nullable: true })
  artistId: string | null; // refers to Artist

  @Column({ nullable: true })
  albumId: string | null; // refers to Album

  @ManyToOne(() => Artist, (artist) => artist.tracks)
  @JoinColumn({ name: 'artistId' })
  artist: Promise<Artist>;

  @ManyToOne(() => Album, (album) => album.tracks)
  @JoinColumn({ name: 'albumId' })
  album: Promise<Album>;

  @OneToOne((type) => Fav, (fav) => fav.artist)
  fav: Promise<Fav>;  

  @Column()
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

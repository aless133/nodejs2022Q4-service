import { Album } from 'src/albums/albums.dto';
import { Artist } from 'src/artists/artists.dto';
import { Track } from 'src/tracks/tracks.dto';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export class Favs {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}

@Entity()
export class Fav {
  @PrimaryGeneratedColumn('uuid')
  fav: string; // uuid v4  
  @Column()
  table: string;
  @Column()
  id: string;

  constructor(partial: Partial<Fav>) {
    Object.assign(this, partial);
  }  
}

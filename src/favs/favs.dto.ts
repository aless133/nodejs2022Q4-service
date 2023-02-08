// import { Album } from 'src/albums/albums.dto';
// import { Artist } from 'src/artists/artists.dto';
// import { Track } from 'src/tracks/tracks.dto';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'favs' })
export class Fav {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4  
  @Column()
  table: string;
  @Column()
  entityId: string;

  constructor(partial: Partial<Fav>) {
    Object.assign(this, partial);
  }  
}

import { Album } from 'src/albums/albums.dto';
import { Artist } from 'src/artists/artists.dto';
import { Track } from 'src/tracks/tracks.dto';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
export type FavsTable = 'tracks' | 'artists' | 'albums';
export type FavsEntity = Artist | Album | Track;

@Entity({ name: 'favs' })
export class Fav {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column()
  table: FavsTable;

  @Column()
  entityId: string;

  @OneToOne(() => Artist, { nullable: true, createForeignKeyConstraints: false })
  @JoinColumn({ name: 'entityId', referencedColumnName: 'id'})
  artist: Promise<Artist>;

  @OneToOne(() => Track, { nullable: true, createForeignKeyConstraints: false })
  @JoinColumn({ name: 'entityId', referencedColumnName: 'id'})
  track: Promise<Track>;

  @OneToOne(() => Album, { nullable: true, createForeignKeyConstraints: false })
  @JoinColumn({ name: 'entityId', referencedColumnName: 'id'})
  album: Promise<Album>;

  constructor(partial: Partial<Fav>) {
    Object.assign(this, partial);
  }
}

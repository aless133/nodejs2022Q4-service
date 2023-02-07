import * as dotenv from 'dotenv';

import { DataSource } from 'typeorm';
import { User } from 'src/users/users.dto';
import { Track } from 'src/tracks/tracks.dto';
import { Artist } from 'src/artists/artists.dto';
import { Album } from 'src/albums/albums.dto';

if (typeof process.env.POSTGRES_PASSWORD == 'undefined') {
  dotenv.config();
}
// console.log(process.env.POSTGRES_PASSWORD);

//for migration generation
export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: parseInt(process.env.POSTGRES_PORT, 10),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [User, Track, Artist, Album],
  // migrations: ['src/migrations/*.ts'],
  // migrationsRun: true,
});

export const DSProvider = {
  provide: 'DATA_SOURCE',
  useFactory: async () => {
    const dataSource = new DataSource({
      type: 'postgres',
      host: 'localhost',
      port: parseInt(process.env.POSTGRES_PORT, 10),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [User, Track, Artist, Album],
      migrations: ['dist/migrations/*.js'],
      migrationsRun: true,
    });
    return dataSource.initialize();
  }
};

import * as dotenv from 'dotenv';

import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from 'src/users/users.dto';
import { Track } from 'src/tracks/tracks.dto';
import { Artist } from 'src/artists/artists.dto';
import { Album } from 'src/albums/albums.dto';
import { Fav } from 'src/favs/favs.dto';

if (typeof process.env.POSTGRES_PASSWORD == 'undefined') {
  dotenv.config();
}

const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT, 10),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [User, Track, Artist, Album, Fav],
};

//for migration generation
export const dataSource = new DataSource(dataSourceOptions);

const providerDataSourceOptions = {
  ...dataSourceOptions,
  migrations: ['dist/migrations/*.js'],
  migrationsRun: true,
  // logging: true,
  parseInt8: true,
};

export const DSProvider = {
  provide: 'DATA_SOURCE',
  useFactory: async () => {
    const dataSource = new DataSource(providerDataSourceOptions);
    return dataSource.initialize();
  },
};

import { Album } from 'src/albums/albums.dto';
import { Artist } from 'src/artists/artists.dto';
import { Track } from 'src/tracks/tracks.dto';

export class Favs {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}

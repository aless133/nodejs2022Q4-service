import { IsArray, ValidateNested } from 'class-validator';
import { Album } from 'src/albums/albums.dto';
import { Artist } from 'src/artists/artists.dto';
import { Track } from 'src/tracks/tracks.dto';

export class Favs {
  @IsArray()
  @ValidateNested({ each: true })
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}

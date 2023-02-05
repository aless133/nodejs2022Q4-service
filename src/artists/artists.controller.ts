import { Controller, Post, Put, Param, Body, ParseUUIDPipe } from '@nestjs/common';
import { CrudController } from '../common/crud.controller';
import { Artist, ArtistDto } from './artists.dto';
import { ArtistsService } from './artists.service';

@Controller('artist')
export class ArtistsController extends CrudController<Artist, ArtistDto, ArtistDto> {
  constructor(readonly dataService: ArtistsService) {
    super();
  }

  @Post()
  create(@Body() data: ArtistDto): Artist {
    return super.create(data);
  }

  @Put(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() data: ArtistDto): Artist {
    return super.update(id, data);
  }
}

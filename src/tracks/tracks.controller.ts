import { Controller, ValidationPipe, UseInterceptors, ClassSerializerInterceptor  } from '@nestjs/common';
import { CrudController } from '../common/crud.controller';
import { Track, TrackDto } from './tracks.dto'
import { TracksService } from './tracks.service';
import { Post, Put, Param, Body, ParseUUIDPipe } from '@nestjs/common';

@Controller('track')
export class TracksController extends CrudController<Track, TrackDto, TrackDto> {
    
    constructor(readonly dataService: TracksService) {
        super();
    }

    @Post()
    create(@Body() data: TrackDto): Track {
      return super.create(data);
    }
    
    @Put(':id')
    update(@Param('id', ParseUUIDPipe) id: string, @Body() data: TrackDto): Track {
      return super.update(id, data);
    }

}

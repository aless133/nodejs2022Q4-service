import { Controller, Get, Post, Put, Param, Body, ParseUUIDPipe, Delete, HttpStatus, HttpCode } from '@nestjs/common';
import { Favs } from './favs.dto';
import { FavsService } from './favs.service';

@Controller('favs')
export class FavsController {
  constructor(readonly dataService: FavsService) {}

  @Get()
  getAll(): Favs {
    return this.dataService.getAll();
  }

  @Post('track/:id')
  @HttpCode(HttpStatus.CREATED)
  addTrack(@Param('id', ParseUUIDPipe) id: string): void {
    this.dataService.add('tracks', id);
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTrack(@Param('id', ParseUUIDPipe) id: string): void {
    this.dataService.delete('tracks', id);
  }

  @Post('album/:id')
  @HttpCode(HttpStatus.CREATED)
  addAlbum(@Param('id', ParseUUIDPipe) id: string): void {
    this.dataService.add('albums', id);
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteAlbum(@Param('id', ParseUUIDPipe) id: string): void {
    this.dataService.delete('albums', id);
  }

  @Post('artist/:id')
  @HttpCode(HttpStatus.CREATED)
  addArtist(@Param('id', ParseUUIDPipe) id: string): void {
    this.dataService.add('artists', id);
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteArtist(@Param('id', ParseUUIDPipe) id: string): void {
    this.dataService.delete('artists', id);
  }
}

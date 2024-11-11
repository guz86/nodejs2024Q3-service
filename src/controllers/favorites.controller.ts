import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  BadRequestException,
  NotFoundException,
  UnprocessableEntityException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { isUUID } from 'class-validator';
import { FavoritesService } from 'src/services/favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAllFavorites() {
    return this.favoritesService.getFavorites();
  }

  @Post('track/:id')
  @HttpCode(HttpStatus.CREATED)
  addTrackToFavorites(@Param('id') id: string) {
    this.validateUUID(id, 'trackId');
    const added = this.favoritesService.addTrack(id);
    if (!added) {
      throw new UnprocessableEntityException('Track does not exist');
    }
    return { message: 'Track added to favorites' };
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeTrackFromFavorites(@Param('id') id: string) {
    this.validateUUID(id, 'trackId');
    const removed = this.favoritesService.removeTrack(id);
    if (!removed) {
      throw new NotFoundException('Track is not in favorites');
    }
  }

  @Post('album/:id')
  @HttpCode(HttpStatus.CREATED)
  addAlbumToFavorites(@Param('id') id: string) {
    this.validateUUID(id, 'albumId');
    const added = this.favoritesService.addAlbum(id);
    if (!added) {
      throw new UnprocessableEntityException('Album does not exist');
    }
    return { message: 'Album added to favorites' };
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeAlbumFromFavorites(@Param('id') id: string) {
    this.validateUUID(id, 'albumId');
    const removed = this.favoritesService.removeAlbum(id);
    if (!removed) {
      throw new NotFoundException('Album is not in favorites');
    }
  }

  @Post('artist/:id')
  @HttpCode(HttpStatus.CREATED)
  addArtistToFavorites(@Param('id') id: string) {
    this.validateUUID(id, 'artistId');
    const added = this.favoritesService.addArtist(id);
    if (!added) {
      throw new UnprocessableEntityException('Artist does not exist');
    }
    return { message: 'Artist added to favorites' };
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeArtistFromFavorites(@Param('id') id: string) {
    this.validateUUID(id, 'artistId');
    const removed = this.favoritesService.removeArtist(id);
    if (!removed) {
      throw new NotFoundException('Artist is not in favorites');
    }
  }

  private validateUUID(id: string, field: string) {
    if (!isUUID(id)) {
      throw new BadRequestException(`Invalid ${field}`);
    }
  }
}

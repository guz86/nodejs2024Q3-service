import { Controller, Get, Post, Delete, Param, BadRequestException, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { isUUID } from 'class-validator';
import { FavoritesService } from 'src/services/favorites.service';

@Controller('favs')
export class FavoritesController {
    constructor(private readonly favoritesService: FavoritesService) { }

    @Get()
    getAllFavorites() {
        return this.favoritesService.getFavorites();
    }

    @Post('track/:id')
    addTrackToFavorites(@Param('id') id: string) {
        this.validateUUID(id, 'trackId');
        const added = this.favoritesService.addTrack(id);
        if (!added) {
            throw new UnprocessableEntityException('Track does not exist');
        }
        return { message: 'Track added to favorites' };
    }

    @Delete('track/:id')
    removeTrackFromFavorites(@Param('id') id: string) {
        this.validateUUID(id, 'trackId');
        const removed = this.favoritesService.removeTrack(id);
        if (!removed) {
            throw new NotFoundException('Track is not in favorites');
        }
    }

    @Post('album/:id')
    addAlbumToFavorites(@Param('id') id: string) {
        this.validateUUID(id, 'albumId');
        const added = this.favoritesService.addAlbum(id);
        if (!added) {
            throw new UnprocessableEntityException('Album does not exist');
        }
        return { message: 'Album added to favorites' };
    }

    @Delete('album/:id')
    removeAlbumFromFavorites(@Param('id') id: string) {
        this.validateUUID(id, 'albumId');
        const removed = this.favoritesService.removeAlbum(id);
        if (!removed) {
            throw new NotFoundException('Album is not in favorites');
        }
    }

    @Post('artist/:id')
    addArtistToFavorites(@Param('id') id: string) {
        this.validateUUID(id, 'artistId');
        const added = this.favoritesService.addArtist(id);
        if (!added) {
            throw new UnprocessableEntityException('Artist does not exist');
        }
        return { message: 'Artist added to favorites' };
    }

    @Delete('artist/:id')
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

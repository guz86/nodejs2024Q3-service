import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, BadRequestException } from '@nestjs/common';
import { isUUID } from 'class-validator';
import { CreateAlbumDto } from 'src/dto/create-album.dto';
import { UpdateAlbumDto } from 'src/dto/update-album.dto';
import { AlbumService } from 'src/services/album.service';

@Controller('album')
export class AlbumController {
    constructor(private readonly albumService: AlbumService) { }

    @Get()
    getAllAlbums() {
        return this.albumService.findAll();
    }

    @Get(':id')
    getAlbumById(@Param('id') id: string) {
        if (!isUUID(id)) {
            throw new BadRequestException('Invalid albumId');
        }
        const album = this.albumService.findOne(id);
        if (!album) {
            throw new NotFoundException('Album not found');
        }
        return album;
    }

    @Post()
    createAlbum(@Body() createAlbumDto: CreateAlbumDto) {
        return this.albumService.create(createAlbumDto);
    }

    @Put(':id')
    updateAlbum(@Param('id') id: string, @Body() updateAlbumDto: UpdateAlbumDto) {
        if (!isUUID(id)) {
            throw new BadRequestException('Invalid albumId');
        }
        const updatedAlbum = this.albumService.update(id, updateAlbumDto);
        if (!updatedAlbum) {
            throw new NotFoundException('Album not found');
        }
        return updatedAlbum;
    }

    @Delete(':id')
    deleteAlbum(@Param('id') id: string) {
        if (!isUUID(id)) {
            throw new BadRequestException('Invalid albumId');
        }
        const deleted = this.albumService.remove(id);
        if (!deleted) {
            throw new NotFoundException('Album not found');
        }
    }
}
import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, BadRequestException } from '@nestjs/common';
import { isUUID } from 'class-validator';
import { CreateArtistDto } from 'src/dto/create-artist.dto';
import { UpdateArtistDto } from 'src/dto/update-artist.dto';
import { ArtistService } from 'src/services/artist.service';

@Controller('artist')
export class ArtistController {
    constructor(private readonly artistService: ArtistService) { }

    @Get()
    getAllArtists() {
        return this.artistService.findAll();
    }

    @Get(':id')
    getArtistById(@Param('id') id: string) {
        if (!isUUID(id)) {
            throw new BadRequestException('Invalid artistId');
        }
        const artist = this.artistService.findOne(id);
        if (!artist) {
            throw new NotFoundException('Artist not found');
        }
        return artist;
    }

    @Post()
    createArtist(@Body() createArtistDto: CreateArtistDto) {
        return this.artistService.create(createArtistDto);
    }

    @Put(':id')
    updateArtist(@Param('id') id: string, @Body() updateArtistDto: UpdateArtistDto) {
        if (!isUUID(id)) {
            throw new BadRequestException('Invalid artistId');
        }
        const updatedArtist = this.artistService.update(id, updateArtistDto);
        if (!updatedArtist) {
            throw new NotFoundException('Artist not found');
        }
        return updatedArtist;
    }

    @Delete(':id')
    deleteArtist(@Param('id') id: string) {
        if (!isUUID(id)) {
            throw new BadRequestException('Invalid artistId');
        }
        const deleted = this.artistService.remove(id);
        if (!deleted) {
            throw new NotFoundException('Artist not found');
        }
    }
}
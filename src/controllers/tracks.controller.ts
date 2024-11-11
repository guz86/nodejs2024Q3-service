import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CreateTrackDto } from 'src/dto/create-track.dto';
import { UpdateTrackDto } from 'src/dto/update-track.dto';
import { Track } from 'src/interfaces/track.interface';
import { TracksService } from 'src/services/tracks.service';

@Controller('track')
export class TracksController {
    constructor(private readonly tracksService: TracksService) { }

    @Get()
    getAllTracks(): Track[] {
        return this.tracksService.getAllTracks();
    }

    @Get(':id')
    getTrackById(@Param('id') id: string): Track {
        return this.tracksService.getTrackById(id);
    }

    @Post()
    createTrack(@Body() createTrackDto: CreateTrackDto): Track {
        return this.tracksService.createTrack(createTrackDto);
    }

    @Put(':id')
    updateTrack(@Param('id') id: string, @Body() updateTrackDto: UpdateTrackDto): Track {
        return this.tracksService.updateTrack(id, updateTrackDto);
    }

    @Delete(':id')
    deleteTrack(@Param('id') id: string): void {
        this.tracksService.deleteTrack(id);
    }
}

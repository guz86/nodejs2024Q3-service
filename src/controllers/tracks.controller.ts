import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { CreateTrackDto } from 'src/dto/create-track.dto';
import { UpdateTrackDto } from 'src/dto/update-track.dto';
import { Track } from 'src/interfaces/track.interface';
import { TracksService } from 'src/services/tracks.service';
import { isUUID } from 'class-validator';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAllTracks(): Track[] {
    return this.tracksService.getAllTracks();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getTrackById(@Param('id') id: string): Track {
    this.validateUUID(id);
    return this.tracksService.getTrackById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createTrack(@Body() createTrackDto: CreateTrackDto): Track {
    return this.tracksService.createTrack(createTrackDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  updateTrack(
    @Param('id') id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ): Track {
    this.validateUUID(id);
    return this.tracksService.updateTrack(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTrack(@Param('id') id: string): void {
    this.validateUUID(id);
    this.tracksService.deleteTrack(id);
  }

  private validateUUID(id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid ID format');
    }
  }
}

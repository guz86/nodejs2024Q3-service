import { Module } from '@nestjs/common';
import { TracksController } from 'src/controllers/tracks.controller';
import { TracksService } from 'src/services/tracks.service';

@Module({
    controllers: [TracksController],
    providers: [TracksService],
})
export class TracksModule { }
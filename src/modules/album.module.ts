import { Module } from '@nestjs/common';
import { AlbumController } from 'src/controllers/album.controller';
import { AlbumService } from 'src/services/album.service';

@Module({
    controllers: [AlbumController],
    providers: [AlbumService],
    exports: [AlbumService],
})
export class AlbumModule { }
import { Module } from '@nestjs/common';
import { FavoritesController } from 'src/controllers/favorites.controller';
import { FavoritesService } from 'src/services/favorites.service';
import { ArtistModule } from './artist.module';
import { AlbumModule } from './album.module';
import { TracksModule } from './tracks.module';

@Module({
  imports: [ArtistModule, AlbumModule, TracksModule],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}

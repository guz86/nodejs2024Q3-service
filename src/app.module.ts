import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user.module';
import { TracksModule } from './modules/tracks.module';
import { ArtistModule } from './modules/artist.module';
import { AlbumModule } from './modules/album.module';
import { FavoritesModule } from './modules/favorites.module';

@Module({
  imports: [
    UserModule,
    TracksModule,
    ArtistModule,
    AlbumModule,
    FavoritesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

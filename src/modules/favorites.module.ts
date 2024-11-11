import { Module } from '@nestjs/common';
import { FavoritesController } from 'src/controllers/favorites.controller';
import { FavoritesService } from 'src/services/favorites.service';

@Module({
    controllers: [FavoritesController],
    providers: [FavoritesService],
})
export class FavoritesModule { }

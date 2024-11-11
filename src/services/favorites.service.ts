import { Injectable } from '@nestjs/common';
import { FavoritesResponse } from 'src/interfaces/favorites.interface';
import { Track } from 'src/interfaces/track.interface';
import { Album } from './album.service';
import { Artist } from './artist.service';

@Injectable()
export class FavoritesService {
    private favorites: FavoritesResponse = {
        artists: [],
        albums: [],
        tracks: [],
    };

    getFavorites(): FavoritesResponse {
        return this.favorites;
    }

    addTrack(id: string): boolean {
        const track = this.findTrackById(id);
        if (!track) return false;
        this.favorites.tracks.push(track);
        return true;
    }

    removeTrack(id: string): boolean {
        const index = this.favorites.tracks.findIndex((track) => track.id === id);
        if (index === -1) return false;
        this.favorites.tracks.splice(index, 1);
        return true;
    }

    addAlbum(id: string): boolean {
        const album = this.findAlbumById(id);
        if (!album) return false;
        this.favorites.albums.push(album);
        return true;
    }

    removeAlbum(id: string): boolean {
        const index = this.favorites.albums.findIndex((album) => album.id === id);
        if (index === -1) return false;
        this.favorites.albums.splice(index, 1);
        return true;
    }

    addArtist(id: string): boolean {
        const artist = this.findArtistById(id);
        if (!artist) return false;
        this.favorites.artists.push(artist);
        return true;
    }

    removeArtist(id: string): boolean {
        const index = this.favorites.artists.findIndex((artist) => artist.id === id);
        if (index === -1) return false;
        this.favorites.artists.splice(index, 1);
        return true;
    }

    private findTrackById(id: string): Track | null {
        return { id, name: 'Sample Track', artistId: null, albumId: null, duration: 240 };
    }

    private findAlbumById(id: string): Album | null {
        return { id, name: 'Sample Album', year: 2021, artistId: null };
    }

    private findArtistById(id: string): Artist | null {
        return { id, name: 'Sample Artist', grammy: false };
    }
}
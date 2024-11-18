import { Injectable } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { AlbumService } from './album.service';
import { TracksService } from './tracks.service';

@Injectable()
export class FavoritesService {
  private favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  constructor(
    private readonly artistService: ArtistService,
    private readonly albumService: AlbumService,
    private readonly trackService: TracksService,
  ) {}

  getFavorites() {
    return this.favorites;
  }

  addArtist(id: string): boolean {
    const artist = this.artistService.findOne(id);
    if (!artist) return false;
    this.favorites.artists.push(artist);
    return true;
  }

  removeArtist(id: string): boolean {
    const index = this.favorites.artists.findIndex(
      (artist) => artist.id === id,
    );
    if (index === -1) return false;
    this.favorites.artists.splice(index, 1);
    return true;
  }

  addAlbum(id: string): boolean {
    const album = this.albumService.findOne(id);
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

  addTrack(id: string): boolean {
    const track = this.trackService.getTrackById(id);
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
}

import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from 'src/dto/create-album.dto';
import { UpdateAlbumDto } from 'src/dto/update-album.dto';
import { v4 as uuidv4 } from 'uuid';

export interface Album {
    id: string;
    name: string;
    year: number;
    artistId: string | null;
}

@Injectable()
export class AlbumService {
    private albums: Album[] = [];

    findAll(): Album[] {
        return this.albums;
    }

    findOne(id: string): Album | undefined {
        return this.albums.find((album) => album.id === id);
    }

    create(createAlbumDto: CreateAlbumDto): Album {
        const newAlbum: Album = {
            ...createAlbumDto,
            id: uuidv4(),
        };
        this.albums.push(newAlbum);
        return newAlbum;
    }

    update(id: string, updateAlbumDto: UpdateAlbumDto): Album | undefined {
        const albumIndex = this.albums.findIndex((album) => album.id === id);
        if (albumIndex === -1) {
            return undefined;
        }
        const updatedAlbum = {
            ...this.albums[albumIndex],
            ...updateAlbumDto,
        };
        this.albums[albumIndex] = updatedAlbum;
        return updatedAlbum;
    }

    remove(id: string): boolean {
        const albumIndex = this.albums.findIndex((album) => album.id === id);
        if (albumIndex === -1) {
            return false;
        }
        this.albums.splice(albumIndex, 1);
        return true;
    }
}

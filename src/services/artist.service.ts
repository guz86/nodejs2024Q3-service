import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from 'src/dto/create-artist.dto';
import { UpdateArtistDto } from 'src/dto/update-artist.dto';
import { v4 as uuidv4 } from 'uuid';

export interface Artist {
    id: string;
    name: string;
    grammy: boolean;
}

@Injectable()
export class ArtistService {
    private artists: Artist[] = [];

    findAll(): Artist[] {
        return this.artists;
    }

    findOne(id: string): Artist | undefined {
        return this.artists.find((artist) => artist.id === id);
    }

    create(createArtistDto: CreateArtistDto): Artist {
        const newArtist: Artist = {
            ...createArtistDto,
            id: uuidv4(),
        };
        this.artists.push(newArtist);
        return newArtist;
    }

    update(id: string, updateArtistDto: UpdateArtistDto): Artist | undefined {
        const artistIndex = this.artists.findIndex((artist) => artist.id === id);
        if (artistIndex === -1) {
            return undefined;
        }
        const updatedArtist = {
            ...this.artists[artistIndex],
            ...updateArtistDto,
        };
        this.artists[artistIndex] = updatedArtist;
        return updatedArtist;
    }

    remove(id: string): boolean {
        const artistIndex = this.artists.findIndex((artist) => artist.id === id);
        if (artistIndex === -1) {
            return false;
        }
        this.artists.splice(artistIndex, 1);
        return true;
    }
}

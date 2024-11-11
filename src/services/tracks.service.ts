import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateTrackDto } from 'src/dto/create-track.dto';
import { UpdateTrackDto } from 'src/dto/update-track.dto';
import { Track } from 'src/interfaces/track.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TracksService {
    private tracks: Track[] = [];

    getAllTracks(): Track[] {
        return this.tracks;
    }

    getTrackById(id: string): Track {
        const track = this.tracks.find((track) => track.id === id);
        if (!track) {
            throw new NotFoundException('Track not found');
        }
        return track;
    }

    createTrack(createTrackDto: CreateTrackDto): Track {
        const { name, artistId, albumId, duration } = createTrackDto;
        const newTrack: Track = {
            id: uuidv4(),
            name,
            artistId,
            albumId,
            duration,
        };
        this.tracks.push(newTrack);
        return newTrack;
    }

    updateTrack(id: string, updateTrackDto: UpdateTrackDto): Track {
        const track = this.getTrackById(id);
        const updatedTrack = { ...track, ...updateTrackDto };
        this.tracks = this.tracks.map((t) => (t.id === id ? updatedTrack : t));
        return updatedTrack;
    }

    deleteTrack(id: string): void {
        const trackIndex = this.tracks.findIndex((track) => track.id === id);
        if (trackIndex === -1) {
            throw new NotFoundException('Track not found');
        }
        this.tracks.splice(trackIndex, 1);
    }
}

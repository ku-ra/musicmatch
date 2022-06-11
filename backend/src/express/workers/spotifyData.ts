//Grab all IDs from Database
//Categorize them into Artists, Tracks and Playlists
//Iterate over each ID per Category and send Request to according API
//Update Metadata for each Row (f.e. imageURL)

import * as Artists from '../interfaces/artist.interface';
import * as Tracks from '../interfaces/track.interface';
import * as Users from '../interfaces/user.interface';

import { getArtists, getTracks, getUser } from '../spotify-api/requestData';
import { clientToken } from '../spotify-api/handleTokens';
import { ArtistInstance } from '../../sequelize/models/artist.model';

export const update = async () => {
    const token = await clientToken();

    if (!token) {
        return;
    }

    const artists = await Artists.getAll();
    const tracks = await Tracks.getAll(); 
    const users = await Users.getAllSpotify();

    updateArtists(artists, token);

    users.forEach(user => { 
        setTimeout(() => {
            updateUser(user.spotifyId, user, token).then((changed) => {
                if (changed) {
                    Users.updateSpotify(user.userId, user.avatar, user.username);
                }
            });
        }, 100);
    });
}

const updateArtists = async (artists: ArtistInstance[], token: string) => {
    const artistIds = artists.map((artist) => artist.artistId);
    const apiLimit = 50;

    console.log(`Updating ${artistIds.length} Artists`);

    for (let i = 0; i < artistIds.length; i += apiLimit) {
        const ids = artistIds.slice(i, i + apiLimit);
        const updated = await getArtists(token, ids);

        artists.forEach((artist) => {
            const updatedData = updated?.find(x => x.id == artist.artistId);
            const image = updatedData?.images[0].url;
    
            if (image != null && image !== artist.image) {
                Artists.update(artist.artistId, image);
            }
        });

        console.log(`Updated Artists: ${apiLimit}`);

        //Sleep 10 Seconds to avoid rate limits
        await new Promise(r => setTimeout(r, 10000));
    }
}

const updateTrack = async (id: string, data: any, token: string) => {
    const updated = (await getTracks(token, [id]));
    const image = updated?.at(0)?.album.images[0].url;
    
    if (image != null && data.image !== image) {
        data.image = image;
    }

    return data;
}

const updateUser = async (id: string, data: any, token: string) => {
    var changed = false;

    const updated = (await getUser(token, id));
    const avatar = updated?.images?.at(0)?.url;
    const username = updated?.display_name;

    if (avatar != null && data.avatar !== avatar) {
        data.avatar = avatar;
        changed = true;
    }

    if (username != null && data.username !== username) {
        data.name = username;
        changed = true;
    }

    return changed;
}
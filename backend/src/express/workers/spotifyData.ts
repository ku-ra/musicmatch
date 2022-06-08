//Grab all IDs from Database
//Categorize them into Artists, Tracks and Playlists
//Iterate over each ID per Category and send Request to according API
//Update Metadata for each Row (f.e. imageURL)

import * as Artists from '../interfaces/artist.interface';
import * as Tracks from '../interfaces/track.interface';
import * as Users from '../interfaces/user.interface';

import { getArtists, getTracks, getUser } from '../spotify-api/requestData';
import { clientToken } from '../spotify-api/handleTokens';

export const update = async () => {
    const token = await clientToken();

    if (!token) {
        return;
    }

    const artists = await Artists.getAll();
    const tracks = await Tracks.getAll(); 
    const users = await Users.getAllSpotify();

    artists.forEach(artist => { updateArtist(artist.artistId, artist, token)
    .then((changed) => {
        if (changed) { 
            Artists.update(artist.artistId, artist.image) 
        }
    })});

    users.forEach(user => { updateUser(user.spotifyId, user, token)
    .then((changed) => {
        if (changed) {
            Users.updateSpotify(user.userId, user.avatar, user.username);
        }
    })});
}



const updateArtist = async (id: string, data: any, token: string) => {
    const updated = (await getArtists(token, [id]));
    const image = updated?.at(0)?.images[0].url;
    
    if (image != null && data.image !== image) {
        data.image = image;
        return true;
    }

    return false;
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
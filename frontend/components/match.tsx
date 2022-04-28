import { useEffect, useState } from 'react'
import { get_match_api } from '../constants/routes' 
import { MatchData } from './matchDetail';

import Client from '../client/axios';
import MatchThumbnail from './matchThumbnail';


const Match = () => {
    const [page, setPage] = useState(0);
    const [matches, setMatches] = useState<MatchData[]>([]);

    const fetchMatches = async () => {
        const response = await Client.post<MatchData[]>(get_match_api, { page: page }).catch((error) => { console.log(error); return; })

        if (response && response.status === 200) {
            setPage(page + 1);
            setMatches(response.data);
        }
    }

    useEffect(() => {
        fetchMatches();
    }, [])

    return (
        <>
            {
                matches.map((match, index) => {
                    return (
                        <>
                        <MatchThumbnail MatchTracks={match.MatchTracks} MatchArtists={match.MatchArtists} User={match.User}
                                        scoreArtist={match.scoreArtist} scoreAverage={match.scoreAverage} scoreGenre={match.scoreGenre}
                                        scoreTrack={match.scoreTrack} secondUserId={match.secondUserId} updatedAt={match.updatedAt} />
                                                                <MatchThumbnail MatchTracks={match.MatchTracks} MatchArtists={match.MatchArtists} User={match.User}
                                        scoreArtist={match.scoreArtist} scoreAverage={match.scoreAverage} scoreGenre={match.scoreGenre}
                                        scoreTrack={match.scoreTrack} secondUserId={match.secondUserId} updatedAt={match.updatedAt} />
                                                                <MatchThumbnail MatchTracks={match.MatchTracks} MatchArtists={match.MatchArtists} User={match.User}
                                        scoreArtist={match.scoreArtist} scoreAverage={match.scoreAverage} scoreGenre={match.scoreGenre}
                                        scoreTrack={match.scoreTrack} secondUserId={match.secondUserId} updatedAt={match.updatedAt} />
                                        <MatchThumbnail MatchTracks={match.MatchTracks} MatchArtists={match.MatchArtists} User={match.User}
                                        scoreArtist={match.scoreArtist} scoreAverage={match.scoreAverage} scoreGenre={match.scoreGenre}
                                        scoreTrack={match.scoreTrack} secondUserId={match.secondUserId} updatedAt={match.updatedAt} />
                                                                <MatchThumbnail MatchTracks={match.MatchTracks} MatchArtists={match.MatchArtists} User={match.User}
                                        scoreArtist={match.scoreArtist} scoreAverage={match.scoreAverage} scoreGenre={match.scoreGenre}
                                        scoreTrack={match.scoreTrack} secondUserId={match.secondUserId} updatedAt={match.updatedAt} />
                                        <MatchThumbnail MatchTracks={match.MatchTracks} MatchArtists={match.MatchArtists} User={match.User}
                                        scoreArtist={match.scoreArtist} scoreAverage={match.scoreAverage} scoreGenre={match.scoreGenre}
                                        scoreTrack={match.scoreTrack} secondUserId={match.secondUserId} updatedAt={match.updatedAt} />
                                                                <MatchThumbnail MatchTracks={match.MatchTracks} MatchArtists={match.MatchArtists} User={match.User}
                                        scoreArtist={match.scoreArtist} scoreAverage={match.scoreAverage} scoreGenre={match.scoreGenre}
                                        scoreTrack={match.scoreTrack} secondUserId={match.secondUserId} updatedAt={match.updatedAt} />
                                        </>
                    )
                })
            }
        </>
    )
}

export default Match;
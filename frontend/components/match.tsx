import { useEffect, useState } from 'react'
import Client from '../client/axios';
import { match_api, get_match_api } from '../constants/routes' 
import User, { UserInfo } from './userinfo';

type MatchData = {
    scoreArtist: number,
    scoreGenre: number,
    scoreTrack: number,
    scoreAverage: number,

    secondUserId: number,
    User: UserInfo,

    updatedAt: Date,
}

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
                        <div className="pt-8" key={index}>
                            <div className="w-full h-full flex flex-row space-x-4 p-4 rounded-full drop-shadow-xl bg-white items-center">
                                <User key={index} avatar={match.User.avatar} country={match.User.country} spotifyUrl={match.User.spotifyUrl} username={match.User.username}></User>
                                <p className="ml-auto">{match.scoreAverage}</p>
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}

export default Match;
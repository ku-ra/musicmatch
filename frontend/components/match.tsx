import { useEffect, useState } from 'react'
import { get_match_api } from '../constants/routes' 

import User, { UserInfo } from './userinfo';
import Client from '../client/axios';

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import MatchDetail, { MatchData } from './matchDetail';

const Match = () => {
    const [page, setPage] = useState(0);
    const [matches, setMatches] = useState<MatchData[]>([]);
    const [showDetails, setShowDetails] = useState(false);

    const fetchMatches = async () => {
        const response = await Client.post<MatchData[]>(get_match_api, { page: page }).catch((error) => { console.log(error); return; })

        if (response && response.status === 200) {
            setPage(page + 1);
            setMatches(response.data);
        }
    }
    
    const onClick = (event: any) => {
        event.preventDefault();
        console.log(showDetails)
        setShowDetails(!showDetails);
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
                            <MatchDetail showDetails={showDetails} onClick={onClick} key={match.secondUserId} updatedAt={match.updatedAt} secondUserId={match.secondUserId} scoreTrack={match.scoreTrack} scoreAverage={match.scoreAverage} scoreGenre={match.scoreGenre} scoreArtist={match.scoreArtist} MatchArtists={match.MatchArtists} MatchTracks={match.MatchTracks} User={match.User}></MatchDetail>
                            <div onClick={onClick} className="cursor-pointer transition duration-150 ease-linear w-full h-full flex flex-row space-x-4 px-5 py-4 rounded-full drop-shadow-xl bg-white items-center hover:scale-[1.02]">
                                <User key={index} avatar={match.User.avatar} country={match.User.country} spotifyUrl={match.User.spotifyUrl} username={match.User.username}></User>
                                <div className="flex-grow"></div>
                                <div className="w-16 h-16 justify-self-end">
                                    <CircularProgressbar value={match.scoreAverage} maxValue={1} text={`${(match.scoreAverage * 100).toFixed(0)}%`} 
                                      styles={buildStyles({
                                        textSize: '20px',                        
                                        // How long animation takes to go from one percentage to another, in seconds
                                        pathTransitionDuration: 0.5,
                                        // Colors
                                        pathColor: '#a855f7',
                                        textColor: '#000',
                                        trailColor: '#eeeeee',
                                        backgroundColor: '#3e98c7',
                                      })}></CircularProgressbar>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}

export default Match;
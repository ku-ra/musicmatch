import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import UserView, { UserInfo } from './userinfo';
import MatchDetail, { MatchData } from './matchDetail';
import { useState } from 'react';

const MatchThumbnail = ({updatedAt, secondUserId, scoreAverage, scoreArtist, scoreGenre, scoreTrack, MatchArtists, MatchTracks, User}: MatchData) => {
    const [showDetails, setShowDetails] = useState(false);
    
    const onClick = (event: any) => {
        event.preventDefault();
        setShowDetails(!showDetails);
    }

    return (
        <>
            <div className="pt-4">
                <MatchDetail showDetails={showDetails} onClick={onClick} key={secondUserId} updatedAt={updatedAt} secondUserId={secondUserId} scoreTrack={scoreTrack} scoreAverage={scoreAverage} scoreGenre={scoreGenre} scoreArtist={scoreArtist} MatchArtists={MatchArtists} MatchTracks={MatchTracks} User={User}></MatchDetail>
                <div onClick={onClick} className="hover:bg-gradient-to-br px-20 hover:from-purple-100 hover:to-pink-50  cursor-pointer transition-all duration-150 ease-linear w-full h-full flex flex-col text-center space-y-4 px-20 py-7 rounded-xl drop-shadow-none bg-white items-center hover:scale-[1.02]">
                    <UserView avatar={User.avatar} country={User.country} spotifyUrl={User.spotifyUrl} username={User.username}></UserView>
                </div>
            </div>
        </>
    )
}

/*
const MatchThumbnail = ({updatedAt, secondUserId, scoreAverage, scoreArtist, scoreGenre, scoreTrack, MatchArtists, MatchTracks, User}: MatchData) => {
    const [showDetails, setShowDetails] = useState(false);
    
    const onClick = (event: any) => {
        event.preventDefault();
        setShowDetails(!showDetails);
    }

    return (
        <>
            <div className="pt-4">
                <MatchDetail showDetails={showDetails} onClick={onClick} key={secondUserId} updatedAt={updatedAt} secondUserId={secondUserId} scoreTrack={scoreTrack} scoreAverage={scoreAverage} scoreGenre={scoreGenre} scoreArtist={scoreArtist} MatchArtists={MatchArtists} MatchTracks={MatchTracks} User={User}></MatchDetail>
                <div onClick={onClick} className="cursor-pointer transition duration-150 ease-linear w-full h-full flex flex-row space-x-4 px-5 py-4 rounded-full drop-shadow-md bg-white items-center hover:scale-[1.02]">
                    <UserView avatar={User.avatar} country={User.country} spotifyUrl={User.spotifyUrl} username={User.username}></UserView>
                    <div className="flex-grow"></div>
                    <div className="w-16 h-16 justify-self-end">
                        <CircularProgressbar value={scoreAverage} maxValue={1} text={`${(scoreAverage * 100).toFixed(0)}%`} 
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
        </>
    )
}

*/
export default MatchThumbnail;
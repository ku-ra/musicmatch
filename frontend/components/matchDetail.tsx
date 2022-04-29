import { MouseEventHandler, useEffect, useState } from 'react'
import { get_match_api } from '../constants/routes' 

import User, { convertCountry, UserInfo } from './userinfo';
import Client from '../client/axios';

import { FaDiscord, FaInstagram } from 'react-icons/fa';

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import { Tooltip } from '@mui/material'
import Track from './track';
import Artist, { ArtistInfo } from './artist';

export type MatchData = {
    scoreArtist: number,
    scoreGenre: number,
    scoreTrack: number,
    scoreAverage: number,

    secondUserId: number,
    User: UserInfo,
    MatchTracks: MatchTrack[],
    MatchArtists: MatchArtist[],

    updatedAt: Date,
    showDetails?: boolean,
    onClick?: MouseEventHandler<HTMLDivElement>
}

type MatchTrack = {
    updatedAt: Date,
    Track: TrackInfo,
}

type TrackInfo = {
    artists: string[],
    image: string,
    name: string,
    url: string,
}

type MatchArtist = {
    updatedAt: Date,
    Artist: ArtistInfo,
}

const MatchDetail = ({secondUserId, scoreAverage, User, MatchTracks, MatchArtists, updatedAt, showDetails, onClick}: MatchData) => {
    return ( <> 
        { showDetails &&  (
            <div>
                <div onClick={onClick} className="fixed w-full h-full backdrop-blur-sm bg-black/20 top-0 left-0 z-40">
                </div>
                <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 h-5/6 z-50 bg-white rounded-xl drop-shadow-md px-10 py-10 space-y-6 flex flex-col items-center overflow-y-scroll" key={secondUserId}>
                    <div className="w-full flex flex-row space-x-2 items-center justify-center">
                        <div className="w-full flex flex-row space-x-6">
                            <div className="w-24 h-24">
                                <img className="w-full h-full rounded-full object-cover" src={User.avatar}></img>
                            </div>
                            <div className="flex flex-col space-y-5">
                                <div>
                                    <h1 className="font-bold text-3xl">{User.username}</h1>
                                    <p className="font-medium text-xs uppercase text-slate-700">{convertCountry(User.country)}</p>
                                </div>
                            </div>
                        </div>
                        <div className="w-[4.5rem]">
                            <CircularProgressbar value={scoreAverage} maxValue={1} text={`${(scoreAverage * 100).toFixed(0)}%`} 
                                styles={buildStyles({
                                textSize: '18px',                        
                                // How long animation takes to go from one percentage to another, in seconds
                                pathTransitionDuration: 0.5,
                                // Colors
                                pathColor: '#000000',
                                textColor: '#000',
                                trailColor: '#f8f8f8',
                                backgroundColor: '#3e98c7',
                                })}></CircularProgressbar>
                        </div>
                    </div>
                    <div className="px-2 space-y-3 flex flex-col justify-center">
                        <p className="text-xs text-slate-700"> 
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor.
                        </p>
                        <div className="flex flex-row justify-center">
                            <div className="flex flex-row w-full space-x-3 items-center">
                                <FaDiscord size={19} color='#5865F2'></FaDiscord>
                                <p className="text-xs font-medium text-slate-900">kura#5555</p>
                            </div>
                            <div className="flex flex-row w-full space-x-3 items-center">
                                <FaInstagram size={19} color='#833AB4'></FaInstagram>
                                <p className="text-xs font-medium text-slate-900">kura#5555</p>
                            </div>
                        </div>
                    </div>

                    <div className="w-full flex flex-col items-center space-y-6">
                        <div className="flex flex-col space-y-4 w-full px-2">   
                            <h2 className="font-bold text-sm pb-2">Your favorite tracks:</h2>      
                            {
                                MatchTracks.map((track) => {
                                    return (
                                        <Track artist={track.Track.artists.join(", ")} name={track.Track.name} image={track.Track.image}></Track>
                                    )
                                })
                            }
                        </div>
                        <div className="flex flex-col space-y-6">   
                            <h2 className="font-bold text-sm self-center">You both listen to:</h2>      
                            <div className="grid grid-cols-3 gap-2">
                            {
                                MatchArtists.map((artist) => {
                                    return (
                                        <Artist name={artist.Artist.name} image={artist.Artist.image} url={artist.Artist.url}></Artist>
                                    )
                                })
                            }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            )
        }
        </>
    )
}

export default MatchDetail;
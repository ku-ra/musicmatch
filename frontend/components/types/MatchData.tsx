import { TrackInfo } from "./Track"
import { ArtistInfo } from "./Artist"
import { MouseEventHandler } from "react"
import { UserInfo } from "./UserInfo"

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

type MatchArtist = {
    updatedAt: Date,
    Artist: ArtistInfo,
}

type MatchTrack = {
    updatedAt: Date,
    Track: TrackInfo,
}



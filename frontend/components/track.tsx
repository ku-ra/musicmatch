import { RoundedImageSmall } from "./RoundedImage";

export type TrackInfo = {
    artist: string,
    name: string,
    image: string,
}

const Track = ({artist, name, image}: TrackInfo) => {
    return (
        <div className="flex flex-row items-center space-x-4">
            <div className="flex-shrink-0">
                <RoundedImageSmall source={image}></RoundedImageSmall>
            </div>
            <div className="flex flex-grow-0 flex-col">
                <p className="font-semibold text-sm text-slate-900">{name}</p>
                <p className="font-normal text-xs text-slate-500">{artist}</p>
            </div>  
        </div>
    )
}

export default Track;
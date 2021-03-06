import { Tooltip } from '@mui/material';
import { RoundedImageBig } from './RoundedImage';
import { ArtistInfo } from './types/Artist';

const Artist = ({name, image, url}: ArtistInfo) => {
    return (
        <div className="flex flex-col items-center text-center p-2 space-y-1">
            <Tooltip title={name} placement="top">
                <a href={url}>
                    <RoundedImageBig source={image}></RoundedImageBig>
                </a>
            </Tooltip>
        </div>
    )
}

export default Artist;
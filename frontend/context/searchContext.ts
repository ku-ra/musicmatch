import React, { useContext } from 'react';
import { ArtistInfo } from '../components/artist';

export type SearchContext = {
    info: ArtistInfo,
    setInfo: Function 
}

const searchContext = React.createContext<SearchContext>({info: {image: "", name: "", url: ""}, setInfo: () => {}});

export const getInfo = () => {
    return useContext(searchContext).info;
}

export const getSetter = () => {
    return useContext(searchContext).setInfo;
}

export { searchContext };
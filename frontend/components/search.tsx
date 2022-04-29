import { FetchEvent } from 'next/dist/server/web/spec-compliant/fetch-event'
import { Router, useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import Client from '../client/axios'
import { data_artists_api } from '../constants/routes'
import { RoundedImageSmall } from './roundedImage'

type SearchData = {
    artistId: string,
    name: string,
    image: string,
    url: string,
}

const Search = () => {
    const router = useRouter();
    const [data, setData] = useState<SearchData[]>()
    
    const fetchArtists = async () => {
        const response = await Client.get<SearchData[]>(data_artists_api).catch(error => { console.log(error) });

        if (response) {
            setData(response.data);
        }
    }

    useEffect(() => {
        fetchArtists();
    }, []);

    const handleOnSearch = (string: any, results: any) => {
        //console.log(string, results)
    }

    const handleOnHover = (result: any) => {
        //console.log(result)
    }

    const handleOnSelect = (item: SearchData) => {
        router.push({pathname: '/artist' });
    }

    const handleOnFocus = () => {
        console.log('Focused')
    }

    const formatResult = (item: SearchData) => {
        console.log(item);
        return (
          <div className="flex flex-row items-center space-x-4 p-2">
            <RoundedImageSmall source={item.image}></RoundedImageSmall>
            <p className="font-bold text-sm">{item.name}</p>
          </div>
        )
    }

    if (!data) {
        return <></>
    }

    return (
        <>
            <ReactSearchAutocomplete
                items={data}
                onSearch={handleOnSearch}
                onHover={handleOnHover}
                onSelect={handleOnSelect}
                onFocus={handleOnFocus}
                autoFocus
                formatResult={formatResult}
                styling={{ zIndex: 10 }}
                placeholder="Search for an artist, track, genre"
                fuseOptions={{ keys: ["name"], shouldSort: true, minMatchCharLength: 1, threshold: 0.2 }}
                resultStringKeyName="name"
            />
            {/*<div className="w-full text-center">
                <input className="rounded-md w-4/5 px-4 py-2 bg-white border-[1px] focus:outline-none focus:bg-white focus:border-purple-500" placeholder="Search for an artist, track, genre"></input>
    </div>*/}
        </>
    )
}

export default Search;
import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react'
import Client from '../client/axios';
import UserView, { UserInfo } from '../components/userinfo';
import { get_user_artists_api } from '../constants/routes';
import { searchContext } from '../context/searchContext'

type SearchResult = {
    User: UserInfo
}

const Search: NextPage = () => {
    const router = useRouter();
    const { info, setInfo } = useContext(searchContext);
    const [ matches, setMatches ] = useState<SearchResult[]>();
    
    const fetchUsers = async () => {
        const response = await Client.post<SearchResult[]>(get_user_artists_api, { artistId: info.artistId });

        if (response) {
            console.log(response.data); 
            setMatches(response.data);
        }
    }

    useEffect(() => {
        if (info.artistId == "" || info.artistId == null) {
            router.push('/');
        }

        fetchUsers();
    }, [])

    return <>
        <div className="flex p-16">
            <div className="w-full h-full flex flex-col justify-center items-center space-y-16">
                <div className="w-full flex flex-row space-x-6 justify-center">
                    <div className="w-24 h-24">
                        <img className="w-full h-full rounded-full object-cover drop-shadow-md" src={info.image}></img>
                    </div>
                    <div className="flex flex-col space-y-5">
                        <div>
                            <h1 className="font-bold text-3xl">{info.name}</h1>
                            <p className="font-medium text-xs uppercase text-slate-700">Artist</p>
                        </div>
                    </div>
                </div>
                <div className="w-3/5 flex flex-row">
                    {matches && matches.map((match) => {
                        return (
                        <div className="hover:bg-gradient-to-br px-20 hover:from-purple-100 hover:to-pink-50  cursor-pointer transition-all duration-150 ease-linear w-min h-full flex flex-col text-center space-y-4 py-7 rounded-xl drop-shadow-none bg-white items-center hover:scale-[1.02]">
                            <UserView avatar={match.User.avatar} country={match.User.country} spotifyUrl={match.User.spotifyUrl} username={match.User.username}></UserView>
                        </div>)
                    })}
                </div>
            </div>
        </div>
    </>
}

export default Search;
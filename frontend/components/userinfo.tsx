import country from 'country-list'

import { FaDiscord, FaInstagram } from 'react-icons/fa';


export type UserInfo = {
    avatar: string,
    country: string,
    spotifyUrl: string,
    username: string,
}

export const convertCountry = (code: string) => {
    const name = country.getName(code);

    if (!name) {
        return code;
    }

    return name;
}

const User = ({ avatar, country, spotifyUrl, username }: UserInfo) => {
    return ( 
        <>
               <div className="w-20 h-20">
                    <img className="w-full h-full rounded-full object-cover" src={avatar}></img>
                </div>
                <div className="flex flex-col space-y-3">
                    <div>
                        <h1 className="font-bold text-sm">{username}</h1>
                        <p className="font-normal text-sm">{convertCountry(country)}</p>
                    </div>
                    <div className="flex flex-row w-full space-x-2 items-center">
                        <FaDiscord size={17} color='#5865F2'></FaDiscord>
                        <FaInstagram size={17} color='#833AB4'></FaInstagram>
                    </div>
                </div>
        </>
    )
}

export default User;
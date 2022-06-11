import country from 'country-list'

import { FaDiscord, FaInstagram } from 'react-icons/fa';

export const convertCountry = (code: string) => {
    const name = country.getName(code);

    if (!name) {
        return code;
    }

    return name;
}

const UserView = ({ avatar, country, spotifyUrl, username, Discord, Instagram }: UserInfo) => {
    return ( 
        <>
               <div className="w-20 h-20">
                    <img className="w-full h-full rounded-full object-cover" src={avatar}></img>
                </div>
                <div className="flex flex-col space-y-3">
                    <div>
                        <h1 className="font-bold text-md">{username}</h1>
                        <p className="font-normal text-xs">{convertCountry(country)}</p>
                    </div>
                    <div className="flex flex-col w-full space-y-2 items-center justify-center">
                        { Discord && <div className="flex flex-row w-full space-x-2 items-center justify-center"><FaDiscord size={17} color='#5865F2'></FaDiscord><p className="text-xs font-regular">{Discord?.username}#{Discord?.discriminator}</p></div>}                        
                        { Instagram && <div className="flex flex-row w-full space-x-2 items-center justify-center"><FaInstagram size={17} color='#833AB4'></FaInstagram><p className="text-xs font-regular">{Instagram?.username}</p></div> }
                    </div>
                </div>
        </>
    )
}

export default UserView;
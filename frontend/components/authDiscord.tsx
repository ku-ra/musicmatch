import axios from 'axios';
import Router from 'next/router';
import qs from 'qs';

import { discord_auth_api } from '../constants/routes';

const DiscordAuth = () => {
    const authDiscord = (event: any) => {
        event.preventDefault();
        window.open(discord_auth_api, "_self");
    }

    return (
        <>
            {/*<a href={auth_api}>
                <button className="transition-all duration-200 ease-in-out hover:-translate-y-1 hover:drop-shadow-lg drop-shadow-md bg-white hover:bg-white text-black font-semibold hover:text-black py-4 px-8 border border-white hover:border-transparent rounded">
                    Login with Spotify
                </button>
            </a>*/}
            <button onClick={authDiscord} className="opacity-90 transition-all duration-200 ease-in-out hover:-translate-y-1 hover:drop-shadow-lg bg-white hover:bg-white font-semibold py-4 px-8 border bg-gradient-to-r text-white from-purple-500 to-pink-500 rounded">
                Connect Discord
            </button>
        </>
    )
}

export default DiscordAuth;
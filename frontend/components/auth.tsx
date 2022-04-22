import axios from 'axios';
import Router from 'next/router';
import qs from 'qs';

import { useEffect, useState } from 'react';
import { auth_api } from '../constants/routes';

const Auth = () => {
    const [authCode, setAuthCode] = useState("");

    return (
        <>
            <a href={auth_api}>
                Spotify Auth
            </a>
        </>
    )
}

export default Auth;
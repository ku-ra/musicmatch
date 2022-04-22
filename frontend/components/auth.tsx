import axios from 'axios';
import Router from 'next/router';
import qs from 'qs';

import { useEffect, useState } from 'react';
import { register_api } from '../constants/routes';

const client_id = "791def1c9862410d9437930e7400ad2c";
const client_secret = "eb9a5ab34a51454095f23e9808900e33";

const auth_token = Buffer.from(`${client_id}:${client_secret}`, 'utf-8').toString('base64');

const token_url = 'https://accounts.spotify.com/api/token';
const auth_url = 'https://accounts.spotify.com/authorize';

const redirect_uri = 'http://localhost:3000/';

const Auth = () => {
    const [authCode, setAuthCode] = useState("");

    const GetSpotifyToken = async () => {
        if (authCode == null || authCode == "") {
            return;
        }

        const data = qs.stringify({ 
            'grant_type': 'authorization_code',
            'code': authCode,
            'redirect_uri': redirect_uri
        });

        console.log(data);
        try {
            const response = await axios.post(token_url, data, {
                headers: { 
                    'Authorization': 'Basic ' + auth_token,
                    'Content-Type': 'application/x-www-form-urlencoded' 
                }
            });

            const success = await SendSpotifyToken(response.data.access_token);

            if (success) {
                console.log("Success");
                return;
            }
            
            console.log("Error when signing up");
        } catch (error) {
            console.error(error);
        } finally {
            Router.push('/');
        }
    }

    const SendSpotifyToken = async (token: string) => {
        const response = await axios.post(register_api, {auth_token: token}, {headers: {'Content-Type': 'application/json'}});
    
        if (response.status === 200) {
            return true;
        }

        return false;
    }
    
    const GetSpotifyAuthURL = () => {
        //const state = generateRandomString(16);
        const scope = 'user-read-email user-read-private user-read-recently-played user-follow-read playlist-read-collaborative playlist-read-private';

        const data = qs.stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri
        });
        
        return `${auth_url}?${data}`;
    }

    const CheckQueryParams = async () => {
        const query = qs.parse(window.location.search);
        const code = query['?code'];
        if (code) {
            setAuthCode(code.toString());
        }
    }

    useEffect(() => {
        CheckQueryParams();
    }, [])

    useEffect(() => {
        GetSpotifyToken();
    }, [authCode])

    return (
        <>
            <a href={GetSpotifyAuthURL()}>
                Spotify Auth
            </a>
        </>
    )
}

export default Auth;
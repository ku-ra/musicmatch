import '../styles/globals.css'

import { UserContext, userContext } from '../context/userContext'

import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import Client from '../client/axios';
import { is_auth_api } from '../constants/routes';

function MyApp({ Component, pageProps }: AppProps) {

  const [user, setUser] = useState<UserContext>({user: "", hasDiscord: false});

  const fetchUser = async () => {
    const response = await Client.get(is_auth_api).catch((error) => { setUser({user: "", hasDiscord: false}) });

    if (response && response.status === 200) {
      setUser({user: response.data.userId, hasDiscord: response.data.hasDiscord});
    }
  }


  useEffect(() => {
    fetchUser();
  }, [])

  return (
    <userContext.Provider value={user}>
      <Component {...pageProps} />
    </userContext.Provider> 
  )

}

export default MyApp

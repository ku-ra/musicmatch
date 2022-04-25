import '../styles/globals.css'

import { userContext } from '../context/userContext'

import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import Client from '../client/axios';
import { is_auth_api } from '../constants/routes';

function MyApp({ Component, pageProps }: AppProps) {

  const [user, setUser] = useState("");

  const fetchUser = async () => {
    const response = await Client.get(is_auth_api).catch((error) => { setUser("") });

    if (response && response.status === 200) {
      setUser(response.data.userId);
    }
  }


  useEffect(() => {
    fetchUser();
  }, [])

  return (
    <userContext.Provider value={{user: user}}>
      <Component {...pageProps} />
    </userContext.Provider> 
  )

}

export default MyApp

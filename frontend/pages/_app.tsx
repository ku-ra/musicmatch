import '../styles/globals.css'

import { UserContext, userContext } from '../context/userContext'
import { SearchContext, searchContext } from '../context/searchContext'

import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import Client from '../client/axios';
import { is_auth_api } from '../constants/routes';
import { SearchData } from '../components/Search'

function MyApp({ Component, pageProps }: AppProps) {

  const [user, setUser] = useState<UserContext>({user: "", hasDiscord: false});

  const [info, setInfo] = useState<SearchData>({artistId: "", image: "", name: "", url: ""});

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
      <searchContext.Provider value={{info: info, setInfo: setInfo}}>
        <Component {...pageProps} /> 
      </searchContext.Provider>
    </userContext.Provider> 
  )

}

export default MyApp

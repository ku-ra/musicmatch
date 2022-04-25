import type { NextPage } from 'next'
import Auth from '../components/authSpotify'
import Client from '../client/axios'
import { is_auth_api } from '../constants/routes'
import { isAuthenticated } from '../context/userContext'
import Match from '../components/match'
import DiscordAuth from '../components/authDiscord'

const Home: NextPage = () => {

  if (!isAuthenticated()) {
    return (
      <div className="w-screen h-screen flex ">
        <div className="w-full h-full flex flex-col justify-center items-center space-y-36">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r bg-clip-text text-transparent from-purple-500 to-pink-500">
              musicmatch.io
            </h1>
            <h2 className="text-xl font-medium">
              a way to connect with people through music.
            </h2>
          </div>
          <Auth></Auth>
        </div>
      </div>
    )
  }

  return (
    <div className="w-screen h-screen flex ">
      <div className="w-full h-full flex flex-col justify-center items-center space-y-36">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r bg-clip-text text-transparent from-purple-500 to-pink-500">
            musicmatch.io
          </h1>
          <h2 className="text-xl font-medium">
            a way to connect with people through music.
          </h2>
          <div className="w-full py-4 text-center">
            <DiscordAuth></DiscordAuth>
          </div>
          <Match></Match>
        </div>
      </div>
    </div>
  )
}

export default Home

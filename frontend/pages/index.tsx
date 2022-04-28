import type { NextPage } from 'next'
import Auth from '../components/authSpotify'
import Client from '../client/axios'
import { get_match_api, server } from '../constants/routes'
import { hasDiscord, isAuthenticated } from '../context/userContext'
import Match from '../components/match'
import DiscordAuth from '../components/authDiscord'
import MatchDetail, { MatchData } from '../components/matchDetail'
import { useEffect, useState } from 'react'

const Home: NextPage = () => {
  const [page, setPage] = useState(0);
  const [matches, setMatches] = useState<MatchData[]>([]);

  const fetchMatches = async () => {
      const response = await Client.post<MatchData[]>(get_match_api, { page: page }).catch((error) => { console.log(error); return; })

      if (response && response.status === 200) {
          setPage(page + 1);
          setMatches(response.data);
      }
  }

  useEffect(() => {
      fetchMatches();
  }, [])
  
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
            {!hasDiscord() && <DiscordAuth></DiscordAuth>}
          </div>
          <Match></Match>
        </div>
      </div>
    </div>
  )

  return (
    <div className="w-screen h-screen flex p-8 bg-slate-100">
      <div className="w-full h-full flex flex-col justify-center items-center space-y-36">
        {
          matches.map((match) => {
            return (
              <MatchDetail key={match.secondUserId} updatedAt={match.updatedAt} secondUserId={match.secondUserId} scoreTrack={match.scoreTrack} scoreAverage={match.scoreAverage} scoreGenre={match.scoreGenre} scoreArtist={match.scoreArtist} MatchArtists={match.MatchArtists} MatchTracks={match.MatchTracks} User={match.User}></MatchDetail>
            )
          })
        }
     </div>
    </div>
  )
}

export default Home

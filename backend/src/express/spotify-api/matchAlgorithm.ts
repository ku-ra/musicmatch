import * as SpotifyData from '../interfaces/spotifyData.interface';

export const findMatches = async (userId: number) => {
    const userData = await SpotifyData.getByUserId(userId);
    const matchData = await SpotifyData.getAll();

    let obj = {
        userId: userId,
        matches: [
            {
                matchPercentage: "10%",
                matchUserId: "23832784"
            }
        ]
    }
    
    matchData.forEach((data) => {

    })
    


}
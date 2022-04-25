import country from 'country-list'

export type UserInfo = {
    avatar: string,
    country: string,
    spotifyUrl: string,
    username: string,
}

const convertCountry = (code: string) => {
    const name = country.getName(code);

    if (!name) {
        return "";
    }

    return name;
}

const User = ({ avatar, country, spotifyUrl, username }: UserInfo) => {
    return ( 
        <>
               <div className="w-20 h-20">
                    <img className="w-full h-full rounded-full object-cover" src={avatar}></img>
                </div>
                <div className="">
                    <h1 className="font-bold">{username}</h1>
                    <p className="font-medium">{convertCountry(country)}</p>
                </div>
        </>
    )
}

export default User;
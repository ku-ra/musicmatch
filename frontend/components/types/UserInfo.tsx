export type UserInfo = {
    avatar: string,
    country: string,
    spotifyUrl: string,
    username: string,
    Discord?: DiscordInfo,
    Instagram?: InstagramInfo,
}

export type DiscordInfo = {
    username: string,
    discriminator: string,
}

export type InstagramInfo = {
    username: string,
}
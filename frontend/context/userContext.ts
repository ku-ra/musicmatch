import React, { useContext } from 'react';

export type UserContext = {
    user: string,
    hasDiscord: boolean,
}

const userContext = React.createContext<UserContext>({user: "", hasDiscord: false});

export const isAuthenticated = () => {
    return getUser() !== "";
}

export const getUser = () => {
    return useContext(userContext).user;
}

export const hasDiscord = () => {
    return useContext(userContext).hasDiscord;
}

export { userContext };
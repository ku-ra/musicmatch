import React, { useContext } from 'react';

const userContext = React.createContext({user: ""});

export const isAuthenticated = () => {
    return getUser() !== "";
}

export const getUser = () => {
    return useContext(userContext).user;
}

export { userContext };
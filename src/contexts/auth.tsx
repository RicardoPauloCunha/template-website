import { createContext, ReactNode, useContext, useState } from 'react';

import { TokenData } from '../util/tokenDecode';

type AuthContextData = {
    userIsChecked: boolean;
    loggedUser: TokenData | null;
    defineLoggedUser: (value: TokenData | null) => void;
}

const AuthContext = createContext({} as AuthContextData);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [loggedUser, setLoggedUser] = useState<TokenData | null>(null);
    const [userIsChecked, setUserIsChecked] = useState(false);

    const defineLoggedUser = (value: TokenData | null) => {
        setLoggedUser(value);
        setUserIsChecked(true);
    }

    let valueContext = {
        userIsChecked,
        loggedUser,
        defineLoggedUser
    }

    return (
        <AuthContext.Provider value={valueContext}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(AuthContext);
}
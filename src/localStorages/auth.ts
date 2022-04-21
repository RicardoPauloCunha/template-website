import { TokenData, tokenDecode } from '../util/tokenDecode';
import { decryptData, encryptData } from '../util/cryptography';

const LOGGED_USER_KEY = "@Template:logged-user";

export const handlerSignIn = (token: string) => {
    let dataUser = tokenDecode(token);

    localStorage.setItem(LOGGED_USER_KEY, encryptData(dataUser));

    return dataUser;
}

export const handlerLogout = () => {
    localStorage.clear();
}

export const getLoggedUser = () => {
    let dataHash = localStorage.getItem(LOGGED_USER_KEY);

    if (dataHash === null)
        return null;

    try {
        return decryptData(dataHash) as TokenData;
    } catch (error) {
        return null;
    }
}

export const userIsAuth = () => {
    let user = getLoggedUser();

    return user !== null;
}

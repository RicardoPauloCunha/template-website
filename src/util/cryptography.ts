import CryptoJS from 'crypto-js';

const secretKey = process.env.REACT_APP_LOCAL_STORAGE_SECRET_KEY as string;

export const encryptData = (data: any): string => {
    let ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
    return ciphertext;
}

export const decryptData = (ciphertext: string) => {
    var bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
}
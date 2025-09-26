import CryptoJS from 'crypto-js';

var secretKey = "hackmeifyoucan"
function encryptData(plainText) {
    const encrypted = CryptoJS.AES.encrypt(plainText, secretKey).toString();
    return encrypted;
}

// Function to decrypt data
function decryptData(encryptedText) {
    const bytes = CryptoJS.AES.decrypt(encryptedText, secretKey);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return decrypted;
}


export { encryptData, decryptData }


let token = "";
let expiresAt = 0;

export function getCachedToken(){
    return {token, expiresAt};
}

export function setCachedToken(newToken, newExpiry){
    token = newToken;
    expiresAt = newExpiry;
}
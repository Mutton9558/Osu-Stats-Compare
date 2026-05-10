import { NextResponse } from "next/server";
import {getCachedToken, setCachedToken} from "@/lib/accessTokenCache";
import { getAuthToken } from "@/lib/getAuth";

async function getToken(){
    const cached = getCachedToken();
    const now = new Date().getTime();
    const nowInSecs = Math.round(now/1000);
    let accessToken, tokenExpiry;

    // token expired
    if(nowInSecs > cached.expiresAt){
        const authTokenQuery = await getAuthToken();
        accessToken = authTokenQuery.access_token;
        tokenExpiry = nowInSecs + authTokenQuery.expires_in;
        setCachedToken(accessToken, tokenExpiry);
    } else {
        accessToken = cached.token;
    }      
    return accessToken;
}

export async function POST(req){
    let data = await req.json();
    let userToFetch = data.user;
    const auth_info = await getToken();

    // get user data
    let userResponse = await fetch(`https://osu.ppy.sh/api/v2/users/@${userToFetch}/osu`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${auth_info}`,
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
    })

    let userData = await userResponse.json();

    return NextResponse.json(userData);
}
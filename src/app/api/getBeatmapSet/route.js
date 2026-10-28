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

export async function GET() {
    const token = await getToken();

    try{
        const beatmapResponse = await fetch("https://osu.ppy.sh/api/v2/beatmapsets/1765296", {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        })

        let res = await beatmapResponse.json();

        return NextResponse.json(res);
    } catch (e) {
        console.log(e);
        return NextResponse.json({error: null})
    }
    
}
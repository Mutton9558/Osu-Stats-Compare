import { NextResponse } from "next/server";

export async function POST(req){
    let data = await req.json();
    let userToFetch = data.user;

    const OSU_CLIENT_ID = process.env.CLIENT_ID;
    const OSU_CLIENT_SECRET = process.env.CLIENT_SECRET;

    // get authorization token from osu first
    const authTokenFetch = await fetch("https://osu.ppy.sh/oauth/token", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            client_id: OSU_CLIENT_ID,
            client_secret: OSU_CLIENT_SECRET,
            grant_type: "client_credentials",
            scope: "public",
        }),
    });

    const authToken = await authTokenFetch.json();

    // get user data
    let userResponse = await fetch(`https://osu.ppy.sh/api/v2/users/@${userToFetch}/osu`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${authToken.access_token}`,
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
    })

    let userData = await userResponse.json();

    return NextResponse.json(userData);
}
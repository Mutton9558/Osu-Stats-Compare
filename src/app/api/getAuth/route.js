import { NextResponse } from "next/server";

export async function POST(req) {
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

    return NextResponse.json(authToken);
}
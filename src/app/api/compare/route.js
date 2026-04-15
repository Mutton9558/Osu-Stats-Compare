import { NextResponse } from "next/server";

export async function POST(req){
    let data = await req.json();
    let userToFetch = data.user;
    let auth_token = data.auth_token;

    // get user data
    let userResponse = await fetch(`https://osu.ppy.sh/api/v2/users/@${userToFetch}/osu`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${auth_token}`,
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
    })

    let userData = await userResponse.json();

    return NextResponse.json(userData);
}
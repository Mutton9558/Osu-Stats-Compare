export async function POST(req){
    let data = await req.json();
    let user1 = data[user1];
    let user2 = data[user2];

    const OSU_CLIENT_ID = process.env.CLIENT_ID;
    const OSU_CLIENT_SECRET = process.env.CLIENT_SECRET;

    // get authorization token from osu first
    const authTokenFetch = await fetch("https://osu.ppy.sh/oauth/token", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify({
            client_id: OSU_CLIENT_ID,
            client_secret: OSU_CLIENT_SECRET,
            grant_type: "client_credentials",
            scope: "public"
        })
    });

    const authToken = await authTokenFetch.json();

    // get first user data
    const firstUserResponse = await fetch(`https://osu.ppy.sh/api/v2/users/@${user1}/osu`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${authToken.access_token}`,
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
    })

    firstUserData = await firstUserResponse.json();

    // get second user data
    const secondUserResponse = await fetch(`https://osu.ppy.sh/api/v2/users/@${user2}/osu`, {
        method: "GET",
        headers: {  
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
    })

    secondUserData = await secondUserResponse.json();
}
import {NextRequest, NextResponse} from "next/server";
import * as util from "node:util";

export async function GET(req: NextRequest) {
    const url = req.nextUrl.searchParams.get("url")

    if (!url) {
        NextResponse.json({
            message: "Missing required parameters"
        }, {
            status: 400
        })
    }

    // The URL matches: https://bsky.app/profile/tockanest.com
    // We need to extract the user_handler from the URL
    const user_handler = url!.split("/")[4]
    // Now we make a request to get the user DID from the user_handler from: https://public.api.bsky.app/xrpc/com.atproto.identity.resolveHandle?handle=
    const response = await fetch(`https://public.api.bsky.app/xrpc/com.atproto.identity.resolveHandle?handle=${user_handler}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })

    const data = await response.json()

    if (data.error) {
        return NextResponse.json({
            message: data.message
        }, {
            status: 500
        })
    }

    // The response is a JSON containing the user DID : { did: 'did:plc:sgd5qliv6nszndu3uaflwaaj' }
    // Now we can use the user DID to get the user's profile data from: https://public.api.bsky.app/xrpc/app.bsky.actor.getProfile?actor=did%3Aplc%3Asgd5qliv6nszndu3uaflwaaj
    const profileApi: string = `https://public.api.bsky.app/xrpc/app.bsky.actor.getProfile?actor=${
        encodeURIComponent(data.did)
    }`

    const profileResponse = await fetch(profileApi, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })

    const profileData = await profileResponse.json()

    if (typeof profileData !== "object") {
        return NextResponse.json({
            message: "An error occurred while fetching data"
        }, {
            status: 500
        })
    } else if (profileData.error) {
        return NextResponse.json({
            message: profileData.message
        }, {
            status: 500
        })
    }

    const profile = profileData as ProfileRequest

    // Now we can send a request to get the user's feed data from:
    // https://public.api.bsky.app/xrpc/app.bsky.feed.getAuthorFeed?actor=<did>&filter=posts_and_author_threads&includePins=true
    const feedApi: string = `https://public.api.bsky.app/xrpc/app.bsky.feed.getAuthorFeed?actor=${
        encodeURIComponent(data.did)
    }&filter=posts_and_author_threads&includePins=true`

    const feedResponse = await fetch(feedApi, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    })

    const feedData = await feedResponse.json()

    if (typeof feedData !== "object") {
        return NextResponse.json({
            message: "An error occurred while fetching data"
        }, {
            status: 500
        })
    } else if (feedData.error) {
        return NextResponse.json({
            message: feedData.message
        }, {
            status: 500
        })
    }

    const feed = feedData as Post // <-- This is not entirely correct, but it's just for demonstration purposes anyway

    // Now we can format the data and return it
    const formattedData = {
        profile,
        feed
    }

    return NextResponse.json({
        profile: formattedData
    }, {
        status: 200
    })
}
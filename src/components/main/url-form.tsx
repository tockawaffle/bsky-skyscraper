"use client"

import {useState} from 'react'
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"

interface UrlFormProps {
    onProfileData: (data: { feed: Post[]; profile: ProfileRequest }) => void
}

export default function UrlForm({onProfileData}: UrlFormProps) {
    const [url, setUrl] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const validateUrl = (input: string) => {
        const postRegex = /^https:\/\/bsky\.app\/profile\/[\w.-]+\/post\/[\w-]+$/
        const hashtagRegex = /^https:\/\/bsky\.app\/hashtag\/[\w-]+$/
        const profileRegex = /^https:\/\/bsky\.app\/profile\/[\w.-]+$/

        if (postRegex.test(input)) return 'post'
        if (hashtagRegex.test(input)) return 'hashtag'
        if (profileRegex.test(input)) return 'profile'
        return null
    }

    const handleSubmit = async () => {
        setError('')
        setLoading(true)
        const urlType = validateUrl(url)

        if (!urlType) {
            setError('Invalid URL format. Please check and try again.')
            setLoading(false)
            return
        }

        try {
            switch (urlType) {
                case "profile": {
                    const response = await fetch(`/api/get/profile?url=${url}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json"
                        }
                    })

                    if (!response.ok || response.status !== 200) {
                        setError('An error occurred while fetching data. Please try again.')
                        return
                    }

                    const data = await response.json() as {
                        profile: {
                            feed: {
                                feed: Post[]
                            },
                            profile: ProfileRequest
                        }
                    }

                    const formattedData: {
                        feed: Post[];
                        profile: ProfileRequest;
                    } = {
                        feed: data.profile.feed.feed,
                        profile: data.profile.profile
                    }

                    console.log(formattedData)

                    onProfileData(formattedData)
                    break
                }
                default: {
                    setError('Not Implemented')
                    break
                }
            }
        } catch
            (err) {
            setError('An error occurred while fetching data. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <div className="flex flex-col space-y-4">
                <div className="flex space-x-2">
                    <Input
                        type="text"
                        placeholder="Enter BlueSky URL"
                        className="flex-grow"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                    <Button onClick={handleSubmit} disabled={loading}>
                        {loading ? 'Loading...' : 'View'}
                    </Button>
                </div>
                {error && <p className="text-destructive text-sm">{error}</p>}
            </div>
        </>
    )
}

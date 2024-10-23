import React, { useState } from 'react'
import { X, MessageSquare, Heart, Repeat2, Calendar, Link as LinkIcon, MapPin } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import UrlForm from '@/components/main/url-form'
import { formatDistanceToNow, format } from 'date-fns'

interface ProfileViewProps {
    initialData: { feed: Post[]; profile: ProfileRequest } | null;
    onClose: () => void;
}

export default function ProfileView({ initialData, onClose }: ProfileViewProps) {
    const [data, setData] = useState(initialData)

    const handleProfileData = (newData: { feed: Post[]; profile: ProfileRequest }) => {
        setData(newData)
    }

    if (!data) return null

    return (
        <div className="fixed inset-0 bg-[#15202b] text-white z-50 overflow-hidden flex flex-col">
            <div className="flex justify-between items-center p-4 border-b border-gray-700 sticky top-0 bg-[#15202b]/95 backdrop-blur supports-[backdrop-filter]:bg-[#15202b]/60 z-10">
                <div className="flex items-center space-x-4">
                    <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-gray-800">
                        <X className="h-4 w-4" />
                    </Button>
                    <div>
                        <h2 className="text-xl font-bold">{data.profile.displayName}</h2>
                        <p className="text-sm text-gray-400">{data.profile.postsCount} posts</p>
                    </div>
                </div>
            </div>

            <ScrollArea className="flex-grow">
                <div className="pb-16">
                    <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-500"></div>
                    <div className="px-4 pb-4 relative">
                        <Avatar className="h-32 w-32 absolute -top-16 ring-4 ring-[#15202b]">
                            <AvatarImage src={data.profile.avatar} alt={data.profile.displayName} />
                            <AvatarFallback>{data.profile.displayName?.[0] ?? data.profile.handle[0]}</AvatarFallback>
                        </Avatar>
                        <div className="pt-20">
                            <h1 className="text-2xl font-bold">{data.profile.displayName}</h1>
                            <p className="text-gray-400">@{data.profile.handle}</p>
                            <p className="mt-2">{data.profile.description}</p>
                            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-400">
                <span className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  Earth
                </span>
                                <span className="flex items-center">
                  <LinkIcon className="h-4 w-4 mr-1" />
                  skyscraper.app
                </span>
                                <span className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  Joined {format(new Date(data.profile.createdAt), 'MMMM yyyy')}
                </span>
                            </div>
                            <div className="flex space-x-4 mt-2 text-sm">
                                <span><strong>{data.profile.followersCount}</strong> <span className="text-gray-400">Followers</span></span>
                                <span><strong>{data.profile.followsCount}</strong> <span className="text-gray-400">Following</span></span>
                            </div>
                        </div>
                    </div>

                    <Separator className="bg-gray-700" />

                    <div className="p-4">
                        <UrlForm onProfileData={handleProfileData} />
                    </div>

                    <Separator className="bg-gray-700" />

                    <div>
                        {data.feed.map((p) => {
                            const post = (p as any).post as Post
                            return (
                                <div key={post.cid} className="border-b border-gray-700 p-4 hover:bg-gray-800/50 transition-colors">
                                    <div className="flex space-x-3">
                                        <Avatar className="h-10 w-10 flex-shrink-0">
                                            <AvatarImage src={post.author.avatar} alt={post.author.displayName} />
                                            <AvatarFallback>{post.author.displayName?.[0] ?? post.author.handle[0]}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between">
                                                <div className="truncate">
                                                    <span className="font-semibold">{post.author.displayName ?? post.author.handle}</span>
                                                    <span className="text-sm text-gray-400 ml-2">@{post.author.handle}</span>
                                                    <span className="text-sm text-gray-400 ml-2">·</span>
                                                    <span className="text-sm text-gray-400 ml-2">{formatDistanceToNow(new Date(post.record.createdAt))} ago</span>
                                                </div>
                                                <Button variant="ghost" size="icon" className="rounded-full text-gray-400 hover:text-white hover:bg-gray-700">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
                                                </Button>
                                            </div>
                                            <p className="text-sm mt-1 break-words">{post.record.text}</p>
                                            {post.embed && post.embed.$type === "app.bsky.embed.images#view" && post.embed.images && (
                                                <div className="mt-2 grid grid-cols-2 gap-2 max-h-80 overflow-hidden">
                                                    {post.embed.images.map((img, imgIndex) => (
                                                        <img key={imgIndex} src={img.thumb} alt={img.alt} className="rounded-md object-cover w-full h-full" />
                                                    ))}
                                                </div>
                                            )}
                                            <div className="flex items-center justify-between mt-3 text-gray-400">
                                                <Button variant="ghost" size="sm" className="hover:text-blue-400 hover:bg-blue-400/10">
                                                    <MessageSquare className="h-4 w-4 mr-2" />
                                                    <span>{post.replyCount}</span>
                                                </Button>
                                                <Button variant="ghost" size="sm" className="hover:text-green-400 hover:bg-green-400/10">
                                                    <Repeat2 className="h-4 w-4 mr-2" />
                                                    <span>{post.repostCount}</span>
                                                </Button>
                                                <Button variant="ghost" size="sm" className="hover:text-red-400 hover:bg-red-400/10">
                                                    <Heart className="h-4 w-4 mr-2" />
                                                    <span>{post.likeCount}</span>
                                                </Button>
                                                <Button variant="ghost" size="sm" className="hover:text-blue-400 hover:bg-blue-400/10">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </ScrollArea>
        </div>
    )
}
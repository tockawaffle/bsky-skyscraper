"use client";

import {CloudLightning, Github, Hash, Linkedin, Twitter, User} from 'lucide-react'
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Separator} from "@/components/ui/separator"
import {ThemeToggle} from '@/components/main/theme-toggle'
import UrlForm from '@/components/main/url-form'
import {useState} from "react";
import ProfileView from "@/components/main/profile-modal";

export default function Page() {

    const [modalData, setModalData] = useState<{ feed: Post[]; profile: ProfileRequest } | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleProfileData = (data: { feed: Post[]; profile: ProfileRequest }) => {
        setModalData(data)
        setIsModalOpen(true)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 text-foreground">
            <div className="container mx-auto px-4 py-8">
                <header className="flex justify-between items-center mb-12">
                    <div className="flex items-center space-x-2">
                        <CloudLightning className="h-8 w-8 text-primary"/>
                        <h1 className="text-3xl font-bold text-primary">SkyScraper</h1>
                    </div>
                    <ThemeToggle/>
                </header>

                <main className="space-y-12">
                    <Card className="bg-card/50 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="text-center text-2xl">
                                Explore <span className="text-primary">BlueSky</span> Without Boundaries
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <UrlForm
                                onProfileData={handleProfileData}
                            />
                        </CardContent>
                    </Card>

                    <section>
                        <h2 className="text-2xl font-semibold mb-6">How SkyScraper Works</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center space-x-2">
                                        <CloudLightning className="h-5 w-5"/>
                                        <span>Posts</span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p>View individual posts and their entire conversation threads.</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center space-x-2">
                                        <Hash className="h-5 w-5"/>
                                        <span>Hashtags</span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p>Explore posts and discussions under specific hashtags.</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center space-x-2">
                                        <User className="h-5 w-5"/>
                                        <span>Profiles</span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p>Browse user profiles and view their public posts.</p>
                                </CardContent>
                            </Card>
                        </div>
                    </section>

                    <Separator/>

                    <section>
                        <h2 className="text-2xl font-semibold mb-6">How to Use SkyScraper</h2>
                        <ol className="list-decimal list-inside space-y-4">
                            <li>Get a post, hashtag, or profile page in the BlueSky app or website</li>
                            <li>Copy the URL from your browser's address bar</li>
                            <li>Paste the URL into the text field above</li>
                            <li>Click "View" to explore the content without a BlueSky account</li>
                        </ol>
                    </section>

                    <Separator/>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">Privacy Notice</h2>
                        <p className="text-muted-foreground">
                            We do not store any data, this app works without a database and queries directly BlueSky's
                            API, bypassing some crucial things like profiles
                            that should only be shown if the user is logged on the app.
                            <br/><br/>
                            The only thing being registered might be for analytics or similar, but even that will be
                            restricted
                            to only visits.
                        </p>
                    </section>

                    <Separator/>

                    <section>
                        <h2 className={"text-2xl font-semibold mb-4"}>
                            Privacy on BlueSky (Or lack thereof)
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <Card>
                                <CardHeader>
                                    <a className={"text-red"} href={"https://skyview.social/"}>SkyView</a>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">
                                        This content has taken from that website, but it sums up the situation pretty
                                        well.

                                        By design, all your BlueSky posts are available to anyone with an internet
                                        connection.
                                        They do not even need a BlueSky account to view all your posts (and images).
                                        All they need is your BlueSky user name.
                                        This is by design. There is no privacy on BlueSky.
                                        Do not think you or your content is safe from scrapers in there.
                                        There's nowhere to run at this point.
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    My Opinion
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">
                                        From recent changes on X's user content agreement, I understand people are
                                        pissed since their content WILL be used for AI training, and they will not be
                                        paid for it.
                                        It is FAIR for you to be mad about it and protest by leaving the platform and
                                        going to another social media like BlueSky.
                                        <br/><br/>
                                        But IF you are going to BlueSky to PROTECT your content thinking you are safe
                                        from scrapers and self-entitled "AI Bros", you are wrong.
                                        Really, really wrong. You're not even shooting yourself in the foot, you're
                                        literally doing a Kurt Cobain POV.
                                        <br/><br/>
                                        Why? Because BlueSky is a platform that is DESIGNED TO BE OPEN. The way atproto
                                        works is that it is a public API, and the only thing that is private is your
                                        login and your DMs.
                                        Everything else is public, and that is a design choice.
                                        <br/><br/>
                                        Don't believe me? Go to the BlueSky website, log out, and try to see your
                                        profile.
                                        You will be able to see it.
                                        <br/>
                                        Now make it private and try again, you won't be able to see it... But now open
                                        the browser's dev
                                        tools, go to the network tab and reload the page.
                                        You'll see a request named something like <span
                                        className={"bg-blue-950 border border-blue-900 w-fit rounded px-1"}>app.bsky.actor.getProfile?....</span> and
                                        you'll see your profile data.
                                        <br/>
                                        Not all of it, sure, but enough to get everything else. Try it, my profile is
                                        private, try visiting it without being logged in
                                        and then set the same URL here at this website. You'll be able to check my
                                        profile:
                                        <br/><br/>
                                        <span
                                            className={"bg-blue-950 border border-blue-900 w-fit rounded p-2"}>
                                        https://bsky.app/profile/tockanest.com
                                            </span>
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </section>
                    <Separator/>
                    <section>
                        <h2 className="text-2xl font-semibold mb-6">Too long, didn't read:</h2>
                        <p className="text-foreground">
                            Your protest is valid, I am pissed too that X is trying to force their users to give up
                            their
                            content for AI bs. If you are protesting and goes to BlueSky, fine. Do whatever really. It's
                            fair for you to do that.
                            <br/><br/>
                            But if you are going to BlueSky to protect your content from scrapers, you are wrong.
                            BlueSky is a platform that is designed to be open
                            and easy to scrape, mainly because of the way the API works. Your content is more exposed
                            there than on X.
                            <br/><br/>
                            How to protect your art and content? Simple, make your own website and give access to
                            people you truly trust. That's the only ACTUAL way to protect your content. And it's not
                            that reliable either. You cannot hide from the internet.
                        </p>
                    </section>
                </main>
            </div>

            <footer className="mt-12 py-8 bg-secondary/10">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="flex flex-col space-y-2">
                            <h3 className="font-semibold text-primary">SkyScraper</h3>
                            <p className="text-sm text-muted-foreground">
                                Explore BlueSky content without boundaries.
                            </p>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <h3 className="font-semibold text-primary">Connect</h3>
                            <div className="flex space-x-4">
                                <a href="https://github.com/tockasnest" target="_blank" rel="noopener noreferrer"
                                   className="text-muted-foreground hover:text-primary transition-colors">
                                    <Github className="h-5 w-5"/>
                                    <span className="sr-only">GitHub</span>
                                </a>
                                <a href="https://twitter.com/tockasnest" target="_blank" rel="noopener noreferrer"
                                   className="text-muted-foreground hover:text-primary transition-colors">
                                    <Twitter className="h-5 w-5"/>
                                    <span className="sr-only">Twitter</span>
                                </a>
                                <a href="https://linkedin.com/company/tockasnest" target="_blank"
                                   rel="noopener noreferrer"
                                   className="text-muted-foreground hover:text-primary transition-colors">
                                    <Linkedin className="h-5 w-5"/>
                                    <span className="sr-only">LinkedIn</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <Separator className="my-8"/>
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-sm text-muted-foreground w-1/2">
                            © {new Date().getFullYear()} Tocka's Nest. All rights reserved.
                        </p>
                        <p className="text-sm text-muted-foreground mt-2 md:mt-0 w-1/2">
                            This application is for demonstration purposes only and does not collect or store any user
                            data. We are not affiliated with BlueSky or any of its partners. This application won't be
                            used
                            for any commercial purposes. You can check the source code on <a
                            href={"https://github.com"}>GitHub</a>
                        </p>
                    </div>
                </div>
            </footer>

            {isModalOpen && (
                <ProfileView
                    initialData={modalData}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    )
}
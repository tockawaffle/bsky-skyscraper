declare global {
    type Thread = {
        thread: {
            $type: "app.bsky.feed.defs#threadViewPost";
            post: Post;
            replies: {
                $type: "app.bsky.feed.defs#threadViewPost";
                post: Post;
                replies: {
                    $type: "app.bsky.feed.defs#threadViewPost";
                    post: Post;
                    replies: ThreadViewPost[];
                }[];
            }[];
        };
    }

    type ThreadViewPost = {
        $type: "app.bsky.feed.defs#threadViewPost";
        post: Post;
        replies: ThreadViewPost[];
    }

    type Post = {
        uri: string;
        cid: string;
        author: Author;
        record: PostRecord;
        embed?: EmbedView; // Optional as not all posts have embeds
        replyCount: number;
        repostCount: number;
        likeCount: number;
        quoteCount: number;
        indexedAt: string;
        labels: Label[]; // Can be empty array
    }

    type Author = {
        did: string;
        handle: string;
        displayName: string | ""; // Can be empty string
        avatar: string;
        associated: {
            chat: {
                allowIncoming: "all" | "following" | "none";
            };
        };
        labels: []; // Can be empty array
        createdAt: string;
    }

    type PostRecord = {
        $type?: "app.bsky.feed.post"; // Might not be present on replies
        createdAt: string;
        embed?: Embed; // Optional embed
        langs: string[];
        text: string;
        reply?: { // Optional reply
            parent: {
                cid: string;
                uri: string;
            };
            root: {
                cid: string;
                uri: string;
            };
        };
    }

    type Embed = {
        $type: "app.bsky.embed.images";
        images: {
            alt: string; // Can be empty string
            aspectRatio: {
                height: number;
                width: number;
            };
            image: {
                $type: "blob";
                ref: {
                    $link: string;
                };
                mimeType: string;
                size: number;
            };
        }[];
    }

    type EmbedView = {
        $type: "app.bsky.embed.images#view";
        images: {
            thumb: string;
            fullsize: string;
            alt: string; // Can be empty string
            aspectRatio: {
                height: number;
                width: number;
            };
        }[];
    }

    type Label = {
        src: string;
        uri: string;
        cid: string;
        val: string;
        cts: string;
    }

    type ProfileRequest = {
        did: string;
        handle: string;
        displayName: string;
        avatar: string;
        associated: {
            chat: {
                allowIncoming: "all" | "following" | "none";
            };
        };
        labels: [];
        createdAt: string;
        description: string;
        indexedAt: string;
        banner: string;
        followersCount: number;
        followsCount: number;
        postsCount: number;
    }
}

export {}

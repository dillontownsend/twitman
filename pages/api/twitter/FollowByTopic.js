import { getSession } from 'next-auth/react'
import Twitter from 'twitter-lite'

export default async (req, res) => {
    const session = await getSession({ req })
    const { q, count } = req.body

    if (session) {
        const { oauth_token, oauth_token_secret, providerAccountId } = session

        // auth setup
        const client = new Twitter({
            consumer_key: process.env.TWITTER_CONSUMER_KEY,
            consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
            access_token_key: oauth_token,
            access_token_secret: oauth_token_secret,
        })

        try {
            // search tweets
            var tweets = await client.get('search/tweets', {
                q: q,
                count: parseInt(count),
                result_type: 'recent',
                lang: 'en',
            })
            console.log(
                `following ${tweets.statuses.length} account(s) by phrase, "${q}"`
            )

            // sync the user's follows (accounts the user is following)
            var followingStatus = await client.get('friends/ids', {
                user_id: providerAccountId,
                stringify_ids: true,
            })
            var following = new Set(followingStatus.ids)
            var next_cursor = followingStatus.next_cursor

            while (next_cursor != 0) {
                followingStatus = await client.get('friends/ids', {
                    user_id: providerAccountId,
                    next_cursor: next_cursor,
                    stringify_ids: true,
                })
                following.add(followingStatus.ids)
                next_cursor = followingStatus.next_cursor
            }

            // follow accounts
            var i = 0
            function myLoop() {
                setTimeout(async function () {
                    // code here
                    try {
                        if (
                            tweets.statuses[i].user.id_str !=
                                session.user.providerAccountId &&
                            !following.has(tweets.statuses[i].user.id_str)
                        ) {
                            const res = await client.post(
                                'friendships/create',
                                {
                                    user_id: tweets.statuses[i].user.id_str,
                                    follow: false,
                                }
                            )
                            console.log(
                                `followed ${i + 1}/${tweets.statuses.length}`
                            )
                            following.add(tweets.statuses[i].user.id_str)
                        }
                    } catch (err) {
                        console.log(err.errors)
                    }
                    // to here
                    i++
                    if (i < tweets.statuses.length) {
                        myLoop()
                    } else {
                        console.log('finished following')
                    }
                }, Math.floor(Math.random() * (60 - 10 + 1) + 10) * 1000)
            }
            myLoop()

            res.status(200).json({ success: true })
        } catch {
            res.status(400).json({ success: false })
        }
    } else {
        res.json({ success: false })
    }
}

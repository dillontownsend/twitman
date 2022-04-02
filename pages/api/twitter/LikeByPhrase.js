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
                `liking ${tweets.statuses.length} tweet(s) by phrase, "${q}"`
            )

            // like tweets
            var i = 0
            function myLoop() {
                setTimeout(async function () {
                    // code here
                    try {
                        if (tweets.statuses[i].user.id_str != providerAccountId) {
                            const res = await client.post(
                                'favorites/create',
                                {
                                    id: tweets.statuses[i].id_str
                                }
                            )
                            console.log(
                                `liked ${i + 1}/${tweets.statuses.length}`
                            )
                        }
                    } catch (err) {
                        console.log(err.errors)
                    }
                    // to here
                    i++
                    if (i < tweets.statuses.length) {
                        myLoop()
                    } else {
                        console.log('finished liking')
                    }
                }, Math.floor(Math.random() * (60 - 10 + 1) + 10) * 1000)
            }
            myLoop()

            res.status(200).json({ success: true })
        } catch {
            res.status(400).json({ success: false })
        }
    } else {
        res.status(400).json({ success: false })
    }
}

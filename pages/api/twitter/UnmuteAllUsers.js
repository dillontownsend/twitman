import { getSession } from 'next-auth/react'
import Twitter from 'twitter-lite'

export default async (req, res) => {
    const session = await getSession({ req })
    
    if (session) {
        const { oauth_token, oauth_token_secret, providerAccountId, screen_name } = session

        // auth setup
        const client = new Twitter({
            consumer_key: process.env.TWITTER_CONSUMER_KEY,
            consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
            access_token_key: oauth_token,
            access_token_secret: oauth_token_secret,
        })

        try {
            // get following
            var followingStatus = await client.get('friends/ids', {
                user_id: providerAccountId,
                stringify_ids: true,
            })
            var following = followingStatus.ids
            var next_cursor = followingStatus.next_cursor

            while (next_cursor != 0) {
                followingStatus = await client.get('friends/ids', {
                    user_id: providerAccountId,
                    next_cursor: next_cursor,
                    stringify_ids: true,
                })
                following.push(followingStatus.ids)
                next_cursor = followingStatus.next_cursor
            }
            console.log(`${screen_name} unmuting all users (${following.length})`)

            // unmute accounts
            var i = 0
            function myLoop() {
                setTimeout(async function () {
                    // code here
                    try {
                        if (following) {
                            const res = await client.post(
                                'mutes/users/destroy',
                                {
                                    user_id: following[i],
                                }
                            )
                            console.log(
                                `${screen_name} unmuted ${i + 1}/${following.length}`
                            )
                        } else {
                            console.log(`${screen_name} not following any accounts`)
                        }
                    } catch (err) {
                        console.log(err.errors)
                    }
                    // to here
                    i++
                    if (i < following.length) {
                        myLoop()
                    } else {
                        console.log(`${screen_name} finished unmuting`)
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
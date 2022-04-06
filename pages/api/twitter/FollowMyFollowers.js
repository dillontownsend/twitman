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
                following.add(followingStatus.ids)
                next_cursor = followingStatus.next_cursor
            }

            // get followers
            var followerStatus = await client.get('followers/ids', {
                user_id: providerAccountId,
                stringify_ids: true,
            })
            var followers = followerStatus.ids
            var next_cursor = followerStatus.next_cursor

            while (next_cursor != 0) {
                followerStatus = await client.get('followers/ids', {
                    user_id: providerAccountId,
                    next_cursor: next_cursor,
                    stringify_ids: true,
                })
                followers.add(followerStatus.ids)
                next_cursor = followerStatus.next_cursor
            }

            // list of users to follow
            var listToFollow = followers.filter(x => !following.includes(x) )
            console.log(`${screen_name} following ${listToFollow.length} users`)

            // follow accounts
            var i = 0
            function myLoop() {
                setTimeout(async function () {
                    // code here
                    try {
                        if (listToFollow) {
                            const res = await client.post(
                                'friendships/create',
                                {
                                    user_id: listToFollow[i],
                                    follow: false,
                                }
                            )
                            console.log(
                                `${screen_name} followed ${i + 1}/${listToFollow.length}`
                            )
                        } else {
                            console.log(`${screen_name} already following all followers`)
                        }
                    } catch (err) {
                        console.log(err.errors)
                    }
                    // to here
                    i++
                    if (i < listToFollow.length) {
                        myLoop()
                    } else {
                        console.log(`${screen_name} finished following`)
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
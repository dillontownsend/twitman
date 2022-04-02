import { getSession } from 'next-auth/react'
import Twitter from 'twitter-lite'

export default async (req, res) => {
    const session = await getSession({ req })
    
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
                followers.push(followerStatus.ids)
                next_cursor = followerStatus.next_cursor
            }

            // list of users to unfollow
            var listToUnfollow = following.filter(x => !followers.includes(x) )
            console.log(`unfollowing ${listToUnfollow.length} users`)

            // unfollow accounts
            var i = 0
            function myLoop() {
                setTimeout(async function () {
                    // code here
                    try {
                        if (listToUnfollow) {
                            const res = await client.post(
                                'friendships/destroy',
                                {
                                    user_id: listToUnfollow[i],
                                }
                            )
                            console.log(
                                `unfollowed ${i + 1}/${listToUnfollow.length}`
                            )
                        } else {
                            console.log('already unfollowed all non-followers')
                        }
                    } catch (err) {
                        console.log(err.errors)
                    }
                    // to here
                    i++
                    if (i < listToUnfollow.length) {
                        myLoop()
                    } else {
                        console.log('finished unfollowing')
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
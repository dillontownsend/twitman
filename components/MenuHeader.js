import React from 'react'
import { useSession } from 'next-auth/react'

const MenuHeader = () => {
    const { data: session } = useSession()
    return (
        <div className="bg-gray-200">
            <div className="w-full md:w-10/12 mx-auto flex items-center justify-evenly text-gray-800 pt-12 pb-2 md:pb-6 px-6">
                <div className="w-full md:w-2/5 hidden md:flex flex-col items-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
                        Hello,<span className="text-twitterBlue"> {session.user.name}</span>!
                    </h1>
                    <h3 className="text-md md:text-lg font-bold mb-8">
                        Clicking on any of the tool cards below will open the
                        options page for that tool. From there, you can set
                        parameters for some of the tools and execute them.{' '}
                        <span className="text-red-500">
                            Malicious use (follower churning) of these tools can get you banned from Twitter
                        </span>
                        , so make sure to read up on{' '}
                        <a
                            href="https://help.twitter.com/en/rules-and-policies/twitter-automation"
                            className="text-twitterBlue"
                        >
                            proper usage of the Twitter API.
                        </a>
                    </h3>
                </div>

                <img
                    className="hidden md:block w-80 rounded-lg border-4 border-solid border-twitterBlue shadow-xl"
                    src={session.user.image}
                    alt=""
                />

                <div className="w-full md:hidden flex flex-col">
                    <div className="w-full flex justify-between items-center mb-6">
                        <h1 className="text-4xl font-bold text-center">
                            Hello,<span className="text-twitterBlue"> {session.user.name}</span>!
                        </h1>
                        <img
                            className=" w-2/5 rounded-lg border-4 border-solid border-twitterBlue shadow-2xl"
                            src={session.user.image}
                            alt=""
                        />
                    </div>
                    <h3 className="md:hidden text-md font-bold mb-3">
                        Clicking on any of the tool cards below will open the
                        options page for that tool. From there, you can set
                        parameters for some of the tools and execute them.
                        <span className="text-red-500">
                            Abusing these tools can get you banned from Twitter
                        </span>
                        , so make sure to read up on{' '}
                        <a
                            href="https://help.twitter.com/en/rules-and-policies/twitter-automation"
                            className="text-twitterBlue"
                        >
                            proper usage of the Twitter API.
                        </a>
                    </h3>
                </div>
            </div>
        </div>
    )
}

export default MenuHeader

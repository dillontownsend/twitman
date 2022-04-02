import React from 'react'
import Image from 'next/image'
import { useSession, signIn, signOut } from 'next-auth/react'
import Dropdown from './Dropdown'

const Nav4 = () => {
    const { data: session } = useSession()
    return (
        <nav className="w-full h-16 bg-twitterDarkest">
            <div className="flex justify-between items-center mx-auto h-full w-4/5">
                <div className="mt-2">
                    <Image src="/TwitMan.png" alt='twitman' width="100" height="60" />
                </div>

                {session ? (
                    <>
                        <Dropdown />
                    </>
                ) : (
                    <>
                        <button
                            type="button"
                            className="w-36 hidden md:inline px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-twitterBlue hover:bg-white hover:text-twitterDarkest"
                            onClick={() => signIn()}
                        >
                            Login with Twitter
                        </button>
                        <button
                            type="button"
                            className="w-24 inline md:hidden px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-twitterBlue hover:bg-white hover:text-twitterDarkest"
                            onClick={() => signIn()}
                        >
                            Login
                        </button>
                    </>
                )}
            </div>
        </nav>
    )
}

export default Nav4

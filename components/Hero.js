/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { useSession, signIn, signOut } from 'next-auth/react'



export default function Example() {
    return (
        <div className="relative bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
                <svg
            className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>


                    <Popover>
                        <div className="relative md:pt-6 px-4 sm:px-6 lg:px-8">
                            
                        </div>

                        <Transition
                            as={Fragment}
                            enter="duration-150 ease-out"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="duration-100 ease-in"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Popover.Panel
                                focus
                                className="absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
                            >
                                
                            </Popover.Panel>
                        </Transition>
                    </Popover>

                    <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                        <div className="sm:text-center lg:text-left">
                            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                                <span className="block xl:inline">
                                    Tools to manage your
                                </span>{' '}
                                <span className="block text-twitterBlue xl:inline">
                                    Twitter account
                                </span>
                            </h1>
                            <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                                TwitMan provides tools to help you easily grow your Twitter account and manage your followers. Get started by signing in with Twitter.
                            </p>
                            <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                                <div className="rounded-md shadow">
                                    <div
                                        onClick={() => signIn()}
                                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-twitterBlue hover:bg-twitterDarkest md:py-4 md:text-lg md:px-40"
                                    >
                                        Login with Twitter
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </main>
                </div>
            </div>
            <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
                <img
                    className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
                    src="https://media.sproutsocial.com/uploads/2017/03/Twitter-Tools-1.png"
                    alt=""
                />
            </div>
        </div>
    )
}

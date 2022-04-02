import {
    BookOpenIcon,
    CodeIcon,
    LockClosedIcon,
    CurrencyDollarIcon
} from '@heroicons/react/outline'

const features = [
    {
        name: 'Security',
        description:
            'Account authentication is handled directly through Twitter and user information is never stored.',
        icon: LockClosedIcon,
    },
    {
        name: 'Free to Use',
        description:
            'These tools are entirely free. The only thing you need to use them is a Twitter account.',
        icon: CurrencyDollarIcon,
    },
    {
        name: 'Open Source',
        description:
            'This project was created by me, Dillon Townsend! You can check out the code for it at github.com/dillontownsend',
        icon: CodeIcon,
    },
    {
        name: 'Simplicity',
        description:
            'Using a Twitman follower tool is as easy as clicking a button!',
        icon: BookOpenIcon,
    },
]

export default function Example() {
    return (
        <div className="py-12 bg-twitterDarkest">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:text-center">
                    <h2 className="text-base text-twitterBlue font-semibold tracking-wide uppercase">
                        Twitter Tools
                    </h2>
                    <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-100 sm:text-4xl">
                        The easiest way to manage your Account
                    </p>
                    <p className="mt-4 max-w-2xl text-xl text-gray-300 lg:mx-auto">
                        Here are a few things you should know about TwitMan.
                    </p>
                </div>

                <div className="mt-10">
                    <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                        {features.map((feature) => (
                            <div key={feature.name} className="relative">
                                <dt>
                                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-white text-twitterBlue">
                                        <feature.icon
                                            className="h-6 w-6"
                                            aria-hidden="true"
                                        />
                                    </div>
                                    <p className="ml-16 text-lg leading-6 font-medium text-gray-100">
                                        {feature.name}
                                    </p>
                                </dt>
                                <dd className="mt-2 ml-16 text-base text-gray-300">
                                    {feature.description}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    )
}

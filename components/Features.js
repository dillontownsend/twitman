import {
    UserRemoveIcon,
    UserIcon,
    VolumeOffIcon,
    VolumeUpIcon,
    HeartIcon,
    RefreshIcon,
    SpeakerphoneIcon,
    UserAddIcon,
    TrashIcon,
    FolderDownloadIcon
} from '@heroicons/react/outline'

const features = [
    {
        name: 'Follow Users by Phrase',
        description:
            'Follow any users that tweet something with a specific phrase or hashtag. You can choose how many users you want to follow with this tool.',
        icon: SpeakerphoneIcon,
    },
    {
        name: 'Follow My Followers',
        description:
            'Follow any users that have followed you that you do not already follow.',
        icon: UserAddIcon,
    },
    {
        name: 'Follow Followers of a User',
        description: 'Follow all users that are following a specific user.',
        icon: UserIcon,
    },
    {
        name: 'Like Tweets by Phrase',
        description:
            'Like tweets that include a specific phrasse. You can choose how many tweets you want to like with this tool.',
        icon: HeartIcon,
    },
    {
        name: 'Retweet Tweets by Phrase',
        description:
            'Retweet tweets that include a specific phrasse. You can choose how many tweets you want to retweet with this tool.',
        icon: RefreshIcon,
    },
    {
        name: 'Unfollow Non-Followers',
        description: 'Unfollow all users that do not follow you back.',
        icon: UserRemoveIcon,
    },
    {
        name: 'Unfollow All Users',
        description: 'Unfollow all users that you are currently following.',
        icon: TrashIcon,
    },
    {
        name: 'Mute All Users',
        description: 'Mute all users that you are currently following.',
        icon: VolumeOffIcon,
    },
    {
        name: 'Unmute All Users',
        description: 'Unmute all users that you are currently following.',
        icon: VolumeUpIcon,
    },
]

export default function Example() {
    return (
        <div className="py-12 bg-twitterDarkest">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:text-center">
                    <h2 className="text-base text-twitterBlue font-semibold tracking-wide uppercase">
                        TwitMan Tools
                    </h2>
                    <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-100 sm:text-4xl">
                        Features included in TwitMan.
                    </p>
                    <p className="mt-4 max-w-2xl text-xl text-gray-300 lg:mx-auto">
                        Login to start using these tools!
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

import React from 'react'
import ToolCard from './ToolCard'
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
import FollowByTopic from '../components/tools/FollowByTopic'
import LikeByPhrase from '../components/tools/LikeByPhrase'
import RtByPhrase from '../components/tools/RtByPhrase'
import FollowMyFollowers from '../components/tools/FollowMyFollowers'
import UnfollowNonFollowers from '../components/tools/UnfollowNonFollowers'
import UnfollowAllUsers from '../components/tools/UnfollowAllUsers'
import FFofAUser from '../components/tools/FFofAUser'
import MuteAllUsers from '../components/tools/MuteAllUsers'
import UnmuteAllUsers from '../components/tools/UnmuteAllUsers'

const ToolMenu = () => {
    const toolInfos = [
        {
            title: 'Follow Users by Phrase',
            description:
                'Follow any users that tweet something with a specific phrase or hashtag. You can choose how many users you want to follow with this tool.',
            icon: SpeakerphoneIcon,
        },
        {
            title: 'Follow My Followers',
            description:
                'Follow any users that have followed you that you do not already follow.',
            icon: UserAddIcon,
        },
        {
            title: 'Follow Followers of a User',
            description: 'Follow all users that are following a specific user.',
            icon: UserIcon,
        },
        {
            title: 'Like Tweets by Phrase',
            description:
                'Like tweets that include a specific phrasse. You can choose how many tweets you want to like with this tool.',
            icon: HeartIcon,
        },
        {
            title: 'Retweet Tweets by Phrase',
            description:
                'Retweet tweets that include a specific phrasse. You can choose how many tweets you want to retweet with this tool.',
            icon: RefreshIcon,
        },
        {
            title: 'Unfollow Non-Followers',
            description: 'Unfollow all users that do not follow you back.',
            icon: UserRemoveIcon,
        },
        {
            title: 'Unfollow All Users',
            description: 'Unfollow all users that you are currently following.',
            icon: TrashIcon,
        },
        {
            title: 'Mute All Users',
            description: 'Mute all users that you are currently following.',
            icon: VolumeOffIcon,
        },
        {
            title: 'Unmute All Users',
            description: 'Unmute all users that you are currently following.',
            icon: VolumeUpIcon,
        },
    ]

    return (
        <div className="w-full h-full min-h-screen bg-gray-200">
            <div className="w-11/12 md:w-7/8 grid grid-cols-1 md:grid-cols-2 gap-6 mx-auto pt-6 pb-12">
                <FollowByTopic />
                <LikeByPhrase />
                <RtByPhrase />
                <FollowMyFollowers />
                <UnfollowNonFollowers />
                <UnfollowAllUsers />
                <FFofAUser />
                <MuteAllUsers />
                <UnmuteAllUsers />
            </div>
        </div>
    )
}

export default ToolMenu

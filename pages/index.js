import React from 'react'
import Features from '../components/Features'
import Hero from '../components/Hero'
import Navbar from '../components/Navbar'
import { useSession, signIn, signOut } from 'next-auth/react'
import ToolMenu from '../components/ToolMenu'
import MenuHeader from '../components/MenuHeader'
import Head from 'next/head'

const Index = () => {
    const { data: session } = useSession()
    if (!session) {
        return (
            <div>
                <Head>
                    <title>TwitMan | Home</title>
                    <meta name="description" content="Tools to help you easily grow your Twitter account and manage your followers." />
                    <meta property="og:title" content='TwitMan | Home' />
                </Head>
                <Navbar />
                <Hero />
                <Features />
            </div>
        )
    }
    return (
        <div>
            <Head>
                <title>TwitMan | {session.user.name}</title>
                <meta name="description" content="Tools to help you easily grow your Twitter account and manage your followers." />
                <meta property="og:title" content={`TwitMan | ${session.user.name}`} />
            </Head>
            <Navbar />
            <MenuHeader />
            <ToolMenu />
        </div>
    )
}

export default Index

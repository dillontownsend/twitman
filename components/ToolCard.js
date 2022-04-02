import React from 'react'

const ToolCard = ({ toolInfo }) => {
    return (
        <div className="flex h-40 rounded-lg bg-white shadow-md cursor-pointer hover:scale-105 transition duration-100 group hover:bg-twitterDarkest">
            <div className="w-1/5 h-full rounded-l-lg flex items-center justify-center bg-twitterBlue text-white group-hover:bg-white group-hover:text-twitterBlue">
                <toolInfo.icon className="h-12 w-12" aria-hidden="true" />
            </div>
            <div className="w-4/5 p-4 md:p-6 flex flex-col justify-start">
                <h5 className="text-twitter-gray-900 text-xl font-medium mb-2 group-hover:text-white">
                    {toolInfo.title}
                </h5>
                <p className="text-gray-500 text-sm md:text-md mb-4 group-hover:text-white">
                    {toolInfo.description}
                </p>
            </div>
        </div>
    )
}

export default ToolCard

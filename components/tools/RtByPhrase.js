/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import ToolCard from '../ToolCard'
import { RefreshIcon } from '@heroicons/react/outline'

export default function Example() {
    const [open, setOpen] = useState(false)
    const cancelButtonRef = useRef(null)
    const [q, setQ] = useState('')
    const [count, setCount] = useState('50')
    const [empty, setEmpty] = useState(false)
    const [response, setResponse] = useState(false)
    const [success, setSuccess] = useState(false)

    const toolInfo = {
        title: 'Retweet Tweets by Phrase',
        description:
            'Retweet tweets that include a specific phrasse. You can choose how many tweets you want to retweet with this tool.',
        icon: RefreshIcon,
    }

    const twitFunction = async () => {
        if (q.length < 1) {
            setEmpty(true)
        } else {
            setEmpty(false)
            const res = await fetch(
                `/api/twitter/RtByPhrase`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        q: `${q}`,
                        count: `${count}`,
                    }),
                }
            )
            const data = await res.json()
            setResponse(true)

            if (data.success) {
                setSuccess(true)
            } else {
                setSuccess(false)
            }
            setTimeout(() => {
                setOpen(false)
                setResponse(false)
                setSuccess(false)
                setQ('')
                setCount(50)
            }, 3000)
        }
    }

    return (
        <>
            <div onClick={() => setOpen(true)}>
                <ToolCard toolInfo={toolInfo} />
            </div>
            <Transition.Root show={open} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed z-10 inset-0 overflow-y-auto"
                    onClose={setOpen}
                >
                    <div className="flex justify-center items-center min-h-screen pt-4 px-4 text-center sm:block sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span
                            className="hidden sm:inline-block sm:align-middle sm:h-screen"
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-twitterBlue sm:mx-0 sm:h-10 sm:w-10">
                                            <RefreshIcon
                                                className="h-6 w-6 text-white"
                                                aria-hidden="true"
                                            />
                                        </div>
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                            <Dialog.Title
                                                as="h3"
                                                className="text-lg leading-6 font-medium text-gray-900"
                                            >
                                                Retweet Tweets by Phrase
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                {response ? (
                                                    <>
                                                        {success ? (
                                                            <>
                                                                <h3 className="text-twitterBlue text-xl">
                                                                    Success!
                                                                </h3>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <h3 className="text-red-500 text-xl">
                                                                    Something
                                                                    went wrong
                                                                    :/
                                                                </h3>
                                                            </>
                                                        )}
                                                    </>
                                                ) : (
                                                    <>
                                                        <p className="text-sm text-gray-500">
                                                            Automatically retweet
                                                            recent tweets that
                                                            contain a specific
                                                            phrase. By default,
                                                            the tool looks up
                                                            the 50 most recent
                                                            tweets to retweet. You
                                                            can change this
                                                            number with the
                                                            count parameter.
                                                        </p>
                                                        <div className="flex justify-center">
                                                            <div className="my-4 xl:w-96">
                                                                {empty ? (
                                                                    <>
                                                                        <label
                                                                            htmlFor="exampleNumber0"
                                                                            className="form-label inline-block text-gray-600 "
                                                                        >
                                                                            Phrase
                                                                        </label>
                                                                        <p className="text-red-500 text-sm mb-2">
                                                                            Phrase
                                                                            cannot
                                                                            be
                                                                            empty
                                                                        </p>
                                                                    </>
                                                                ) : (
                                                                    <label
                                                                        htmlFor="exampleNumber0"
                                                                        className="form-label inline-block mb-2 text-gray-600 "
                                                                    >
                                                                        Phrase
                                                                    </label>
                                                                )}
                                                                <input
                                                                    type="text"
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setQ(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    placeholder="ex: cats"
                                                                    defaultValue={
                                                                        q
                                                                    }
                                                                    className="form-control
                                                        block
                                                        w-full
                                                        px-3
                                                        py-1.5
                                                        text-base
                                                        font-normal
                                                        text-gray-700
                                                        bg-white bg-clip-padding
                                                        border border-solid border-gray-300
                                                        rounded
                                                        transition
                                                        ease-in-out
                                                        m-0
                                                        mb-2
                                                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                                />
                                                                <label
                                                                    htmlFor="exampleNumber0"
                                                                    className="form-label inline-block mb-2 text-gray-600 "
                                                                >
                                                                    Count (Max 100)
                                                                </label>
                                                                <input
                                                                    type="number"
                                                                    max={100}
                                                                    defaultValue={
                                                                        count
                                                                    }
                                                                    className="
                                                        form-control
                                                        block
                                                        w-full
                                                        px-3
                                                        py-1.5
                                                        text-base
                                                        font-normal
                                                        text-gray-700
                                                        bg-white bg-clip-padding
                                                        border border-solid border-gray-300
                                                        rounded
                                                        transition
                                                        ease-in-out
                                                        m-0
                                                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                                      "
                                                                    id="exampleNumber0"
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setCount(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {response ? (
                                    <></>
                                ) : (
                                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                        <button
                                            type="button"
                                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-twitterBlue text-base font-medium text-white hover:bg-twitterDarkest  sm:ml-3 sm:w-auto sm:text-sm"
                                            onClick={() => twitFunction()}
                                        >
                                            Run Tool
                                        </button>
                                        <button
                                            type="button"
                                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50  sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                            onClick={() => setOpen(false)}
                                            ref={cancelButtonRef}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                )}
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    )
}

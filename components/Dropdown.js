/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { useSession, signOut } from 'next-auth/react'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Example() {
    const { data: session } = useSession()
    if (session) {
        return (
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button className="inline-flex justify-center w-full rounded-lg border border-white shadow-sm">
                        <img src={session.user.image} className='w-10 rounded-lg' alt="" />
                        
                    </Menu.Button>
                </div>

                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="origin-top-right absolute right-0 mt-0 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                            <div onClick={() => signOut()}>
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            type="submit"
                                            className={classNames(
                                                active
                                                    ? 'bg-gray-100 text-gray-900'
                                                    : 'text-gray-700',
                                                'block w-full text-left px-4 py-2 text-sm'
                                            )}
                                        >
                                            Sign out
                                        </button>
                                    )}
                                </Menu.Item>
                            </div>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        )
    } else {
        return (
            <></>
        )
    }
}
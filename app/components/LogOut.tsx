"use client"

import { useRouter } from 'next/navigation'
import React from 'react'
import { BiLogOut } from 'react-icons/bi'
import { logOut } from '../utils/action'

const LogOut = () => {
    const router = useRouter()

    const handleLogOut = async () => {
        await logOut()
        router.push('/signin')
    }

    return (
        <div>
            <button
                onClick={handleLogOut}
                className='bg-rose-600 hover:bg-rose-700 text-white px-3.5 py-2 items-center rounded mt-4 flex gap-2'
            >
                <BiLogOut />  Log Out
            </button>
        </div>
    )
}

export default LogOut
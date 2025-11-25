import React from 'react'
import { verifyUser } from '../utils/session'
import { redirect } from 'next/navigation'
import { BiLogOut } from 'react-icons/bi'
import LogOut from '../components/LogOut'

const Page = async () => {
    const { user, success } = await verifyUser()


    if (!success) {
        redirect('/signin')
    }
    return (

        <div className='m-3'>
            <div className="flex flex-col gap-2">
                <div className='font-medium'>Firstname: {user.firstname}</div>
                <div className='font-medium'>Lastname: {user.lastname} </div>
                <div className='font-medium'>Email: {user.email}</div>

            </div>
            <LogOut/>
        </div>
    )
}

export default Page
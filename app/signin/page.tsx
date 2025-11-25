"use client"

import Link from "next/link"
import { ChangeEvent, useState } from "react"
import { DotLoader } from "react-spinners"
import { toast, ToastContainer } from "react-toastify"
import { signIn } from "../utils/action"
import { useRouter } from "next/navigation"



const Page = () => {
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const [user, setUser] = useState({
        password: "",
        email: "",
        id: ''
    })

    const handleSignIn = async () => {
        setLoading(true)

        const response = await signIn(user)

        if (!response.success) {
            toast.error(response.message)
        } else {
            router.push('/user-dashboard')
            toast.success(response.message)
        }
        setLoading(false)
    }

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name
        const value = e.target.value

        const updatedUser = {
            ...user,
            [name]: value,
        }

        setUser(updatedUser)
    }

    return (
        <div className="flex items-center h-screen">
            <ToastContainer />
            <div className='max-w-md mx-auto px-4 bg-blue-50 py-10'>
                <h1 className="font-bold text-slate-800 text-xl text-center my-5">Sign In</h1>
                <div>
                    <div className="grid grid-cols-2 items-center gap-5 mt-5">
                        <input
                            className='border border-slate-700 py-3 px-3 placeholder:font-medium text-sm outline-blue-50 rounded'
                            type="email"
                            name='email'
                            placeholder='Email'
                            onChange={handleInput}
                        />
                        <input
                            className='border border-slate-700 py-3 px-3 placeholder:font-medium text-sm outline-blue-50 rounded'
                            type="password"
                            name='password'
                            placeholder='******'
                            onChange={handleInput}
                        />
                        <small className="font-medium">Forgot password?</small>

                    </div>

                    <button
                        onClick={handleSignIn}
                        className={`w-full bg-slate-300 font-semibold hover:bg-slate-400 mt-5 rounded-lg py-3 transtion
                        ${loading && "bg-slate-50 cursor-not-allowed"}
                        `}>
                        {loading ? <DotLoader size={18} /> : "Sign In"}
                    </button>
                </div>

                <small className="text-medium mt-5 text-slate-900 flex gap-2">
                    New here?
                    <Link
                        href={'/signup'}
                        className="text-bold underline"
                    >
                        Sign Up
                    </Link>
                    here
                </small>
            </div>
        </div>
    )
}

export default Page
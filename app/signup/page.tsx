"use client"

import { ChangeEvent, useState } from "react"
import { signUp } from "../utils/action"
import Link from "next/link"
import { toast, ToastContainer } from "react-toastify"
import { DotLoader } from "react-spinners"
import Image from "next/image"
import { useRouter } from "next/navigation"

const Page = () => {
    const [loading, setLoading] = useState(false)
    const [preview, setPreview] = useState("")
    const router =useRouter()

    const [user, setUser] = useState({
        firstname: "",
        lastname: "",
        password: "",
        email: "",
        photo: "",
        aboutme: "",
        occupation: "",
        location: "",
        website: ""
    })
    const handleSignUp = async () => {
        setLoading(true)
        const response = await signUp(user)
        if (!response.success) {
            toast.error(response.message)
        } else {
            toast.success(response.message)
            router.push('/signin')
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

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return;

        const reader = new FileReader()

        reader.onloadend = () => {
            const photoBase64 = reader.result as string;
            setPreview(photoBase64)

            setUser(prev => ({
                ...prev,
                photo: photoBase64
            }))
        }
        reader.readAsDataURL(file)
    }

    return (
        <div className="flex items-center h-screen">
            <ToastContainer />
            <div className='max-w-md mx-auto px-4 bg-blue-50 py-10'>
                <h1 className="font-bold text-slate-800 text-xl text-center my-5">Sign Up</h1>
                <div>
                    <div className="grid grid-cols-2 items-center gap-5 mt-5">
                        <input
                            type="text"
                            name='firstname'
                            value={user.firstname}
                            onChange={handleInput}
                            className='border border-slate-700 py-3 px-3 placeholder:font-medium text-sm outline-blue-50 rounded'
                            placeholder='First Name'
                        />
                        <input
                            className='border border-slate-700 py-3 px-3 placeholder:font-medium text-sm outline-blue-50 rounded'
                            type="text"
                            name='lastname'
                            value={user.lastname}
                            onChange={handleInput}
                            placeholder='Last Name'
                        />
                        <input
                            className='border border-slate-700 py-3 px-3 placeholder:font-medium text-sm outline-blue-50 rounded'
                            type="email"
                            name='email'
                            value={user.email}
                            onChange={handleInput}
                            placeholder='Email'
                        />
                        <input
                            className='border border-slate-700 py-3 px-3 placeholder:font-medium text-sm outline-blue-50 rounded'
                            type="text"
                            name='aboutme'
                            value={user.aboutme}
                            onChange={handleInput}
                            placeholder='About me'
                        />
                        <input
                            className='border border-slate-700 py-3 px-3 placeholder:font-medium text-sm outline-blue-50 rounded'
                            type="text"
                            name='location'
                            onChange={handleInput}
                            placeholder='Location'
                        />
                        <input
                            className='border border-slate-700 py-3 px-3 placeholder:font-medium text-sm outline-blue-50 rounded'
                            type="text"
                            name='occupation'
                            value={user.occupation}
                            onChange={handleInput}
                            placeholder='Occupation'
                        />
                        <input
                            className='border border-slate-700 py-3 px-3 placeholder:font-medium text-sm outline-blue-50 rounded'
                            type="text"
                            name='website'
                            value={user.website}
                            onChange={handleInput}
                            placeholder='Website'
                        />
                        <label
                            className='border border-slate-700 py-3 px-3 text-slate-500 text-sm font-medium outline-blue-50 rounded'
                            htmlFor="photo"
                        >
                            <input
                                type="file"
                                name="photo"
                                id="photo"
                                // value={user.photo}
                                className="hidden"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                            Add Photo
                        </label>
                        <input
                            className='border border-slate-700 py-3 px-3 placeholder:font-medium text-sm outline-blue-50 rounded'
                            type="password"
                            name='password'
                            value={user.password}
                            onChange={handleInput}
                            placeholder='******'
                        />

                        {
                            preview && (
                                <Image
                                    src={preview}
                                    alt="Picture"
                                    className="border object-cover rounder-full size-20"
                                    width={200}
                                    height={200}
                                />
                            )
                        }
                    </div>

                    <button
                        onClick={handleSignUp}
                        className={`w-full bg-slate-300 font-semibold hover:bg-slate-400 mt-5 rounded-lg py-3 transtion
                        ${loading && "bg-slate-50 cursor-not-allowed"}
                        `}>
                        {loading ? <DotLoader size={18} /> : "Sign up"}
                    </button>

                </div>
                <small className="text-medium mt-5 text-slate-900 flex gap-2">
                    Have an account?
                    <Link
                        href={'/signin'}
                        className="text-bold underline"
                    >
                        Sign In
                    </Link>
                    here
                </small>
            </div>
        </div>
    )
}

export default Page
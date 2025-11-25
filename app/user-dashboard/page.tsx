"use client"

import React, { ChangeEvent, useEffect, useState } from 'react'
import { BiBriefcase, BiCalendar, BiCamera, BiMapPin, BiSave, BiGlobe } from 'react-icons/bi';
import { CgMail } from 'react-icons/cg';
import { FiEdit2 } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';
import Image from 'next/image';
import { getUser, logOut, updateUser } from '@/app/utils/action';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';



const Page = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter()
    const [profileData, setProfileData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        aboutme: '',
        location: '',
        occupation: '',
        website: '',
        joindate: '',
        photo: ''
    });

    const [editData, setEditData] = useState({ ...profileData });

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await getUser();

                if (response.success && response.user) {
                    const userData = {
                        firstname: response.user.firstname || '',
                        lastname: response.user.lastname || '',
                        email: response.user.email || '',
                        aboutme: response.user.aboutme || '',
                        location: response.user.location || '',
                        occupation: response.user.occupation || '',
                        website: response.user.website || '',
                        joindate: response.user.createdAt
                            ? new Date(response.user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
                            : '',
                        photo: response.user.photo
                    };
                    setProfileData(userData);
                    setEditData(userData);
                }
            } catch (error) {
                console.log("Fetching User Error: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser()
    }, []);

    const handleEdit = () => {
        setIsEditing(true);
        setEditData({ ...profileData });
    };

    const handleSave = async () => {
        try {
            await updateUser(editData)

            setProfileData({ ...editData });
            setIsEditing(false);
        } catch (error) {
            console.error("Save error:", error);
        }
    };

    const handleCancel = () => {
        setEditData({ ...profileData });
        setIsEditing(false);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const name = e.target.name
        const value = e.target.value

        setEditData(prev => ({ ...prev, [name]: value }));
    };

    const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return;

        const reader = new FileReader()

        reader.onloadend = () => {
            const photoBase64 = reader.result as string;

            setEditData(prev => ({
                ...prev,
                photo: photoBase64
            }))
        }
        reader.readAsDataURL(file)
    };

    const handleLogOut = async () => {
        await logOut()
        toast.success('You have logged out successfully')
        router.push('/signin')
    }


    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-lg font-medium">Loading profile...</p>
            </div>
        );
    }



    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
                    <div className="h-48 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400"></div>
                    <div className="relative px-6 pb-6">
                        <div className="flex justify-between items-start -mt-20 mb-4">
                            <div className="relative">
                                <Image
                                    src={isEditing ? editData.photo : profileData.photo}
                                    alt="Profile"
                                    className="w-32 h-32 rounded-full border-4 border-white shadow-xl object-cover"
                                    width={200}
                                    height={200}
                                />
                                {isEditing && (
                                    <label className="absolute bottom-0 right-0 bg-purple-500 p-2 rounded-full cursor-pointer shadow-lg hover:bg-purple-600 transition-colors">
                                        <BiCamera size={20} className="text-white" />
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handlePhotoChange}
                                        />
                                    </label>
                                )}
                            </div>

                            <div className="mt-4">
                                {!isEditing ? (
                                    <button
                                        onClick={handleEdit}
                                        className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors shadow-md"
                                    >
                                        <FiEdit2 size={18} />
                                        Edit Profile
                                    </button>
                                ) : (
                                    <div className="flex gap-2">
                                        <button
                                            onClick={handleSave}
                                            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors shadow-md"
                                        >
                                            <BiSave size={18} />
                                            Save
                                        </button>
                                        <button
                                            onClick={handleCancel}
                                            className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors shadow-md"
                                        >
                                            <IoMdClose size={18} />
                                            Cancel
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="space-y-3">
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="firstname"
                                    value={editData.firstname}
                                    onChange={handleChange}
                                    className="text-3xl font-bold text-gray-800 border-b-2 border-purple-300 focus:border-purple-500
                                             outline-none w-full placeholder:text-sm"
                                    placeholder='Last Name'
                                />
                            ) : (
                                <h1 className="text-3xl font-bold text-gray-800">{profileData.firstname}</h1>
                            )}

                            {isEditing ? (
                                <input
                                    type="text"
                                    name="lastname"
                                    value={editData.lastname}
                                    onChange={handleChange}
                                    className="text-3xl font-bold text-gray-800 border-b-2 border-purple-300 focus:border-purple-500 
                                            outline-none w-full placeholder:text-sm"
                                    placeholder='Last Name'
                                />
                            ) : (
                                <h1 className="text-3xl font-bold text-gray-800">{profileData.lastname}</h1>
                            )}

                            {isEditing ? (
                                <textarea
                                    value={editData.aboutme}
                                    name='aboutme'
                                    onChange={handleChange}
                                    className="text-gray-600 border border-purple-300 rounded-lg p-2 focus:border-purple-500 
                                            outline-none w-full placeholder:text-sm"
                                    rows={2}
                                    placeholder='Edit bio'
                                />
                            ) : (
                                <p className="text-gray-600">{profileData.aboutme || "No bio added yet"}</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Contact Information</h2>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <CgMail className="text-purple-500 mt-1" size={20} />
                                <div className="flex-1">
                                    <p className="text-sm text-gray-500">Email</p>
                                    {isEditing ? (
                                        <input
                                            type="email"
                                            value={editData.email}
                                            name='email'
                                            onChange={handleChange}
                                            className="text-gray-800 border-b border-purple-300 focus:border-purple-500 outline-none 
                                                    w-full placeholder:text-sm"
                                            placeholder='Email'
                                        />
                                    ) : (
                                        <p className="text-gray-800">{profileData.email}</p>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <BiMapPin className="text-purple-500 mt-1" size={20} />
                                <div className="flex-1">
                                    <p className="text-sm text-gray-500">Location</p>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={editData.location}
                                            name="location"
                                            onChange={handleChange}
                                            className="text-gray-800 border-b border-purple-300 focus:border-purple-500 outline-none w-full"
                                        />
                                    ) : (
                                        <p className="text-gray-800">{profileData.location || "Not specified"}</p>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <BiBriefcase className="text-purple-500 mt-1" size={20} />
                                <div className="flex-1">
                                    <p className="text-sm text-gray-500">Occupation</p>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={editData.occupation}
                                            name="occupation"
                                            onChange={handleChange}
                                            className="text-gray-800 border-b border-purple-300 focus:border-purple-500 outline-none w-full"
                                        />
                                    ) : (
                                        <p className="text-gray-800">{profileData.occupation || "Not specified"}</p>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <BiGlobe className="text-purple-500 mt-1" size={20} />
                                <div className="flex-1">
                                    <p className="text-sm text-gray-500">Website</p>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={editData.website}
                                            name='website'
                                            onChange={handleChange}
                                            className="text-gray-800 border-b border-purple-300 focus:border-purple-500 outline-none w-full"
                                        />
                                    ) : (
                                        <p className="text-purple-600 hover:underline cursor-pointer">
                                            {profileData.website || "Not specified"}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Additional Information</h2>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <BiCalendar className="text-purple-500 mt-1" size={20} />
                                <div>
                                    <p className="text-sm text-gray-500">Member Since</p>
                                    <p className="text-gray-800">{profileData.joindate || "N/A"}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-purple-500">127</p>
                                    <p className="text-sm text-gray-500">Posts</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-pink-500">2.5K</p>
                                    <p className="text-sm text-gray-500">Followers</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-blue-500">842</p>
                                    <p className="text-sm text-gray-500">Following</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Skills & Interests</h2>
                    <div className="flex flex-wrap gap-2">
                        {['UI Design', 'UX Research', 'Figma', 'React', 'Tailwind CSS', 'Prototyping', 'User Testing', 'Design Systems'].map((skill) => (
                            <span
                                key={skill}
                                className="px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full text-sm font-medium"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                <button
                    onClick={handleLogOut}
                    className="bg-red-500 hover:bg-red-600 font-medium text-white px-3.5 py-2 mt-5 rounded">Log out</button>
            </div>
        </div>
    )
}

export default Page
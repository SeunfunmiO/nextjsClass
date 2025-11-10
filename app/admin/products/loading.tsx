"use client";
import React from 'react'
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

const Loading = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6 ml-36">
            {Array(8).fill({ length: 20 }).map((_, i) => (
                <div key={i} className="flex gap-5">
                    <div className="size-70 border border-gray-100 shadow-md shadow-gray-100  bg-white flex flex-col 
                            items-center justify-center gap-2 p-5 rounded-lg">
                        <Skeleton className='size-20' />
                        <div className="mt-3 space-y-2">
                            <Skeleton className='size-70' />
                            <Skeleton className='size-70' />
                        </div>
                    </div>
                </div>
            ))}
        </div>

    )
}

export default Loading
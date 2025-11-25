import Button from '@/app/components/Button';
import { addProduct } from '@/app/utils/action';
import Image from 'next/image';
import React from 'react'

const Page = () => {
    return (
        <div className='flex bg-gray-100 justify-center gap-5 items-center w-full h-screen flex-col'>
            <form
                className="rounded-xl p-3 w-full bg-white shadow flex flex-col gap-4 max-w-xl">
                <h1 className="text-2xl font-bold text-center">New Product Page</h1>
                <input
                    type="text"
                    name='title'
                    className='border rounded px-2'
                    placeholder='Title' />
                <input
                    type="number"
                    name='price'
                    className='border rounded px-2'
                    placeholder='Price' />

                <Button text='Add Product' />
            </form>

            <div className="flex items-center gap-3">
                <Image src={'/splash-img.avif'}
                    alt='img'
                    width={200}
                    height={300}
                />

                <Image
                    src={"https://plus.unsplash.com/premium_photo-1763306454161-2587c3791de3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8"}
                    alt='img'
                    width={200}
                    height={300}
                />
            </div>
        </div>
    )
}

export default Page
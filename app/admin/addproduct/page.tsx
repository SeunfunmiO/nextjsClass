"use client"

import { addProduct } from '@/app/utils/action';
import { useRef, useTransition } from 'react';

const Page = () => {
    const titleRef = useRef<HTMLInputElement>(null)
    const priceRef = useRef<HTMLInputElement>(null)
    const [isPending, startTransition] = useTransition();

    const uploadProduct = async () => {
        const title = titleRef.current?.value
        const price = priceRef.current?.value


        if (title && price) {
            startTransition(async () => {
                await addProduct({ title, price })
            })
        }
    }

    return (
        <div className='flex bg-gray-100 justify-center gap-5 items-center w-full h-screen'>
            <div
                className="rounded-xl p-3 w-full bg-white shadow flex flex-col gap-4 max-w-xl">
                <h1 className="text-2xl font-bold text-center">Add Product Page</h1>
                <input
                    ref={titleRef}
                    type="text"
                    name='title'
                    className='border rounded px-2'
                    placeholder='Title'
                    autoComplete='title' />
                <input
                    ref={priceRef}
                    type="number"
                    name='price'
                    className='border rounded px-2'
                    placeholder='Price'
                    autoComplete='price' />
                <button
                    onClick={uploadProduct}
                    className={isPending ? ` px-3 py-2 rounded bg-teal-50 text-white cursor-not-allowed` : ` px-3 py-2 rounded bg-teal-800 text-white`}>
                    {isPending ? "Adding Product..." : "Add Product"}
                </button>


            </div>
        </div>
    )
}

export default Page
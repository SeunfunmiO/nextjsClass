import Button from '@/app/components/Button';
import { addProduct } from '@/app/utils/action';
import React from 'react'

const Page = () => {
    return (
        <div className='flex bg-gray-100 justify-center gap-5 items-center w-full h-screen'>
            <form action={addProduct}
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
        </div>
    )
}

export default Page
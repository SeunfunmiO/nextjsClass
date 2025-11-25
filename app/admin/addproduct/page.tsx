"use client"

import { addProduct } from '@/app/utils/action';
import { useRouter } from 'next/navigation';
import { useRef, useTransition } from 'react';
import { toast } from 'react-toastify';

const Page = () => {
    const nameRef = useRef<HTMLInputElement>(null)
    const titleRef = useRef<HTMLInputElement>(null)
    const priceRef = useRef<HTMLInputElement>(null)
    const descriptionRef = useRef<HTMLTextAreaElement>(null)
    const quantityRef = useRef<HTMLInputElement>(null)
    const imageRef = useRef<HTMLInputElement>(null)

    const [isPending, startTransition] = useTransition();
    const router = useRouter()

    const uploadProduct = async () => {
        const name = nameRef.current?.value
        const title = titleRef.current?.value
        const price = priceRef.current?.value
        const description = descriptionRef.current?.value
        const quantity = quantityRef.current?.value
        const image = imageRef?.current?.value

        const isValid = name && title && price && description && quantity && image
        if (isValid) {
            startTransition(async () => {
                const result = await addProduct({ name, title, price, description, quantity, image })
                if (result.success) {
                    router.push('/admin/products-db')
                } else {
                    toast.error(result.message)
                }
            })
        }
    }

    return (
        <div className='flex bg-gray-100 justify-center gap-5 items-center w-full h-screen'>
            <div
                className="rounded-xl p-3 w-full bg-white shadow flex flex-col gap-4 max-w-xl">
                <h1 className="text-2xl font-bold text-center">Add Product Page</h1>
                <input
                    ref={nameRef}
                    type="text"
                    name='price'
                    className='border rounded px-2'
                    placeholder='Name'
                    autoComplete='name'
                />
                <input
                    ref={titleRef}
                    type="text"
                    name='title'
                    className='border rounded px-2'
                    placeholder='Title'
                    autoComplete='title'
                />
                <input
                    ref={priceRef}
                    type="number"
                    name='price'
                    className='border rounded px-2'
                    placeholder='Price'
                    autoComplete='price'
                />
                <input
                    ref={quantityRef}
                    type="number"
                    name='quantity'
                    className='border rounded px-2'
                    placeholder='Quantity'
                    autoComplete='quantity'
                />
                <input
                    ref={imageRef}
                    type="file"
                    name='image'
                    className='border rounded px-2'
                    placeholder='image'
                    accept='image/*'
                />
                <textarea
                    ref={descriptionRef}
                    name='description'
                    className='border rounded px-2'
                    placeholder='Description'
                    autoComplete='description'
                >
                </textarea>
                <button
                    onClick={uploadProduct}
                    className={isPending ? ` px-3 py-2 rounded bg-slate-200 cursor-not-allowed` :
                        ` px-3 py-2 rounded bg-slate-800 text-white`}>
                    {isPending ? "Adding Product..." : "Add Product"}
                </button>
            </div>
        </div>
    )
}

export default Page
"use client"

import React, { useState } from 'react'
import { editProduct } from '../utils/action'
import { FiEdit3 } from 'react-icons/fi'
import { toast } from 'react-toastify'


const EditButton = ({ id, product }: { id: string; product: any }) => {
    const [openEditModal, setOpenEditModal] = useState(false)

    const EditButtonAction = async (formData: FormData) => {
        const title = formData.get('title') as string
        const price = formData.get('price') as string

        const res = await editProduct(id, {
            title,
            price,
        })
        if (res.success) {
            toast.success(res.message)
            setOpenEditModal(false)
        } else {
            toast.error(res.message)
        }
    }

    return (
        <div>
            <button
                onClick={() => setOpenEditModal(true)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-blue-600 bg-blue-50 hover:bg-blue-100
                 rounded-lg transition-colors duration-200 font-medium">
                <FiEdit3 className="w-4 h-4" />
                Edit
            </button>


            {
                openEditModal && (
                    <div
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                        onClick={() => setOpenEditModal(false)}
                    >
                        <div
                            className="bg-white rounded-2xl shadow-lg w-11/12 max-w-md p-4 relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h2 className="text-lg font-bold text-gray-800 text-center mb-4">Edit Product</h2>
                            <hr className='border border-gray-200' />
                            <p className="text-gray-800 my-5 text-center text-sm lg:text-base">
                                Input data, to update product.
                            </p>

                            <form action={EditButtonAction}>
                                <div className='flex flex-col justify-center items-center my-5 gap-3'>
                                    <input
                                        type="text"
                                        name='title'
                                        className='border border-gray-400 py-2 placeholder:font-medium placeholder:text-sm outline-0
                                     rounded px-2'
                                        placeholder='Title'
                                        autoComplete='title'
                                        defaultValue={product?.title}
                                    />
                                    <input
                                        type="number"
                                        name='price'
                                        className='border border-gray-400 py-2 placeholder:font-medium placeholder:text-sm outline-0
                                     rounded px-2'
                                        placeholder='Price'
                                        autoComplete='price'
                                        defaultValue={product?.price}
                                    />
                                </div>

                                <div className="flex justify-center items-center gap-3 mt-6">
                                    <button
                                        onClick={() => setOpenEditModal(false)}
                                        className="py-2 rounded-lg outline outline-slate-600 hover:bg-slate-600  hover:text-white
                                font-medium w-full text-sm lg:text-base"
                                    >
                                        Cancel
                                    </button>
                                    <button

                                        type='submit'
                                        className="py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-medium w-full text-sm 
                                lg:text-base"
                                    >
                                        Update Product
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                )
            }
        </div>
    )
}

export default EditButton
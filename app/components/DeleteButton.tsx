"use client"

import React, { useState } from 'react'
import { deleteProduct } from '../utils/action'
import { toast } from 'react-toastify'
import { TbTrash } from 'react-icons/tb'
import { BsTrash2 } from 'react-icons/bs'

const DeleteButton = ({ id }: { id: string }) => {
    const [openDeleteModal, setOpenDeleteModal] = useState(false)

    const deleteProductAction = async () => {
        const res = await deleteProduct(id)
        if (res.success) {
            toast.success(res.message)
            setOpenDeleteModal(false)
        } else {
            toast.error(res.message)
        }
    }

    return (
        <div >
            <button 
                onClick={() => setOpenDeleteModal(true)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-red-600 bg-red-50 hover:bg-red-100
             rounded-lg transition-colors duration-200 font-medium">
                <BsTrash2 className="w-4 h-4" />
                Delete
            </button>



            {openDeleteModal && (
                <div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                    onClick={() => setOpenDeleteModal(false)}
                >
                    <div
                        className="bg-white rounded-2xl shadow-lg w-11/12 max-w-md p-4 relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-lg font-bold text-gray-800 text-center mb-4">Delete Product Confirmation</h2>
                        <hr className='border border-gray-200' />
                        <p className="text-gray-800 my-5 text-center text-sm lg:text-base">
                            Are you sure you want to delete this product ? If you click proceed , all your data will be deleted permanently.
                        </p>

                        <div className='flex justify-center items-center my-5'>
                            <TbTrash 
                            size={100} 
                            />
                        </div>

                        <div className="flex justify-center items-center gap-3 mt-6">
                            <button
                                onClick={() => setOpenDeleteModal(false)}
                                className="py-2 rounded-lg outline outline-slate-600 hover:bg-slate-600  hover:text-white
                                font-medium w-full text-sm lg:text-base"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={deleteProductAction}
                                className="py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 font-medium w-full text-sm 
                                lg:text-base"
                            >
                                Proceed
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default DeleteButton
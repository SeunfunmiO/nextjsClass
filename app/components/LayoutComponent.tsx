"use client"

import Link from 'next/link'
import React, { useState } from 'react'
import { BiMenu, BiPackage, BiShoppingBag } from 'react-icons/bi'
import { BsCart2 } from 'react-icons/bs'
import { FaBox, FaBoxOpen } from 'react-icons/fa6'
import { FcContacts } from 'react-icons/fc'
import { GrDashboard } from 'react-icons/gr'
import { MdAddShoppingCart } from 'react-icons/md'
import { RiAdminFill } from 'react-icons/ri'

const LayoutComponent = () => {
    const [isOpen, setIsOpen] = useState(false)

    const handleMenuBar = () => {
        if (!isOpen) {
            setIsOpen(true)
        } else {
            setIsOpen(false)
        }
    }

    return (
        <div>
            <button
                onClick={handleMenuBar}
                className="outline-0 ml-10">
                <BiMenu size={40} />
            </button>

            {
                isOpen && (
                    <div className="w-60 pt-5 px-3 bg-slate-600 text-white h-screen fixed overflow-auto flex 
        flex-col gap-2">
                        <Link
                            onClick={() => setIsOpen(false)}
                            className="hover:text-gray-200 transition flex gap-2 items-center"
                            href={"/admin"}>
                            <RiAdminFill /> Admin
                        </Link>
                        <Link
                            onClick={() => setIsOpen(false)}
                            className="hover:text-gray-200 transition flex gap-2 items-center"
                            href={"/admin/dashboard"}>
                            <GrDashboard /> Dashboard
                        </Link>
                        <Link
                            onClick={() => setIsOpen(false)}
                            className="hover:text-gray-200 transition flex gap-2 items-center"
                            href={"/admin/contact"}>
                            <FcContacts /> Contact
                        </Link>
                        <Link
                            onClick={() => setIsOpen(false)}
                            className="hover:text-gray-200 transition flex gap-2 items-center"
                            href={"/admin/products"}>
                            <FaBoxOpen /> Products
                        </Link>
                        <Link
                            onClick={() => setIsOpen(false)}
                            className="hover:text-gray-200 transition flex gap-2 items-center"
                            href={"/admin/cart"}>
                            <BsCart2 /> Cart
                        </Link>
                        <Link
                            onClick={() => setIsOpen(false)}
                            className="hover:text-gray-200 transition flex gap-2 items-center"
                            href={"/admin/newproduct"}>
                            <FaBox /> New Product
                        </Link>
                        <Link
                            onClick={() => setIsOpen(false)}
                            className="hover:text-gray-200 transition flex gap-2 items-center"
                            href={"/admin/newclientproduct"}>
                            <BiShoppingBag /> New Client Product
                        </Link>
                        <Link
                            onClick={() => setIsOpen(false)}
                            className="hover:text-gray-200 transition flex gap-2 items-center"
                            href={"/admin/addproduct"}>
                            <MdAddShoppingCart /> Add Product
                        </Link>
                        <Link
                            onClick={() => setIsOpen(false)}
                            className="hover:text-gray-200 transition flex gap-2 items-center"
                            href={"/admin/products-db"}>
                            <BiPackage /> Fetch Products from DB
                        </Link>
                    </div>
                )
            }
        </div>

    )
}

export default LayoutComponent
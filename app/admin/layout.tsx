import Link from "next/link";
import { BiShoppingBag } from "react-icons/bi";
import { BsCart2 } from "react-icons/bs";
import { FaBox, FaBoxOpen } from "react-icons/fa6";
import { FcContacts } from "react-icons/fc";
import { GrDashboard } from "react-icons/gr";
import { MdAddShoppingCart } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <div className="flex flex-col md:flex-row h-screen">
        <div className="w-40 pt-5 pl-2 bg-amber-900 text-white h-screen fixed overflow-auto flex 
        flex-col gap-2">
            <Link
                className="hover:text-gray-200 transition flex gap-2 items-center"
                href={"/admin"}>
                <RiAdminFill /> Admin
            </Link>
            <Link
                className="hover:text-gray-200 transition flex gap-2 items-center"
                href={"/admin/dashboard"}>
                <GrDashboard /> Dashboard
            </Link>
            <Link
                className="hover:text-gray-200 transition flex gap-2 items-center"
                href={"/admin/contact"}>
                <FcContacts /> Contact
            </Link>
            <Link
                className="hover:text-gray-200 transition flex gap-2 items-center"
                href={"/admin/products"}>
                <FaBoxOpen /> Products
            </Link>
            <Link
                className="hover:text-gray-200 transition flex gap-2 items-center"
                href={"/admin/cart"}>
                <BsCart2 /> Cart
            </Link>
            <Link
                className="hover:text-gray-200 transition flex gap-2 items-center"
                href={"/admin/newproduct"}>
                <FaBox /> New Product
            </Link>
            <Link
                className="hover:text-gray-200 transition flex gap-2 items-center"
                href={"/admin/newclientproduct"}>
                <BiShoppingBag /> New Client Product
            </Link>
            <Link
                className="hover:text-gray-200 transition flex gap-2 items-center"
                href={"/admin/addproduct"}>
                <MdAddShoppingCart /> Add Product
            </Link>
        </div>
        {children}
    </div>

}
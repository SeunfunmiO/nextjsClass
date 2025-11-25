import Link from "next/link";
import { BiPackage, BiShoppingBag } from "react-icons/bi";
import { BsCart2 } from "react-icons/bs";
import { FaBox, FaBoxOpen } from "react-icons/fa6";
import { FcContacts } from "react-icons/fc";
import { GrDashboard } from "react-icons/gr";
import { MdAddShoppingCart } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import ToastContainer from "../toast/ToastContainer";
import LayoutComponent from "../components/LayoutComponent";

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <div className="flex flex-col md:flex-row h-screen">
        <ToastContainer />
        <LayoutComponent />
        {children}
    </div>

}
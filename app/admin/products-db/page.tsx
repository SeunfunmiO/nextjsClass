
import DeleteAll from "@/app/components/DeleteAll";
import DeleteButton from "@/app/components/DeleteButton";
import EditButton from "@/app/components/EditButton";
import ProductModel from "@/app/models/products.model";
import dbConnect from "@/app/utils/dbConnect";
import Link from "next/link";
// import { Suspense } from "react";
import { BiPackage } from "react-icons/bi";
import { BsTrash2 } from "react-icons/bs";
import { FaDollarSign } from "react-icons/fa6";
// import { DotLoader } from "react-spinners";




export default async function ProductsPage() {
    await dbConnect();
    const products = await ProductModel.find();


    return (
        <div className="min-h-screen/ bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4 mx-auto">
            <div className="max-w-6xl mx-auto flex items-center flex-col">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center gap-3">
                            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-xl shadow-lg">
                                <BiPackage className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-slate-800">Products</h1>
                                <p className="text-slate-500 text-sm mt-1">{products.length} items in inventory</p>
                            </div>
                        </div>
                        <DeleteAll />
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                        #
                                    </th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                        Product
                                    </th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                        Price
                                    </th>
                                    <th className="text-right px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {products.map((product, index) => (
                                    <tr
                                        key={product._id}
                                        className="hover:bg-slate-50 transition-colors duration-150"
                                    >
                                        <td className="px-6 py-4">
                                            <span className="text-slate-500 font-medium">{index + 1}</span>
                                        </td>
                                        <td className="px-6 py-4 cursor-pointer">
                                            <Link href={`/admin/products-db/${product._id}`}>
                                                <span className="text-slate-800 font-medium">{product.name}</span>
                                            </Link>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1">
                                                <FaDollarSign className="w-4 h-4 text-green-600" />
                                                <span className="text-slate-800 font-semibold">{product.price.toFixed(2)}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <DeleteButton id={product._id.toString()} />
                                                <EditButton id={product._id.toString()} product={product} />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="md:hidden divide-y divide-slate-100">
                        {products.map((product, index) => (
                            <div key={product._id} className="p-4 hover:bg-slate-50 transition-colors duration-150">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-xs font-semibold text-slate-400">#{index + 1}</span>
                                        </div>
                                        <h3 className="text-slate-800 font-semibold">{product.title}</h3>
                                    </div>
                                    <div className="flex items-center gap-1 bg-green-50 px-3 py-1 rounded-lg">
                                        <FaDollarSign className="w-4 h-4 text-green-600" />
                                        <span className="text-green-700 font-bold">{product.price.toFixed(2)}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <DeleteButton id={product._id.toString()} />
                                    <EditButton id={product._id.toString()} product={product} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {products.length === 0 && (
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-4">
                            <BiPackage className="w-8 h-8 text-slate-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-800 mb-2">No products yet</h3>
                        <p className="text-slate-500">Add your first product to get started</p>
                    </div>
                )}
            </div>
        </div>
    );
}
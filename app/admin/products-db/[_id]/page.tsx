
// import ProductModel from '@/app/models/products.model'
// import { Metadata } from 'next'
// import React from 'react'
// [{_id:"hello"}, {id:"hi"}, {id:"hey"}]

// const page = async ({ params }: { params: Promise<{ _ids: string[] }> }) => {
//     const { _ids } = await params
//     const _id = ids[0]

//     return (
//         <div className='m-5'>
//             This a a single page showing the details of the id : {_id} of this product.
//         </div>
//     )
// }


// export const generateMetadata = async ({ params }: { params: Promise<{ _id: string }> }) => {
//     const { _id } = await params
//     const product = await ProductModel.findById(_id)

//     const metadata: Metadata = {
//         title: `${product.title} | Store`,
//         description:product.description,
//         openGraph: {
//             images: {
//                 url: product.image
//             }
//         }

//     }

//     return metadata
// }

// const page = async ({ params }: { params: Promise<{ _id: string }> }) => {
//     const { _id } = await params


//     return (
//         <div className='m-5'>
//             This a a single page showing the details of the id : {_id} of this product.
//             {product.image}
//             {product.name}
//         </div>
//     )
// }

// export default page


import { Metadata } from 'next'
import Image from 'next/image'
import ProductModel from '@/app/models/products.model'
import { BiHeart, BiShield, BiStar } from 'react-icons/bi'
import { CgShoppingCart } from 'react-icons/cg'
import { CiShare2 } from 'react-icons/ci'
import { BsTruck } from 'react-icons/bs'
import { FiRotateCcw } from 'react-icons/fi'

export const generateMetadata = async ({ params }: { params: Promise<{ _id: string }> }): Promise<Metadata> => {
    const { _id } = await params
    const product = await ProductModel.findById(_id)

    return {
        title: `${product.title} | Store`,
        description: product.description,
        openGraph: {
            images: {
                url: product.image
            }
        }
    }
}

const Page = async ({ params }: { params: Promise<{ _id: string }> }) => {
    const { _id } = await params
    const product = await ProductModel.findById(_id)

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <nav className="flex items-center space-x-2 text-sm text-gray-500">
                    <a href="/" className="hover:text-gray-900">Home</a>
                    <span>/</span>
                    <a href="/products" className="hover:text-gray-900">Products</a>
                    <span>/</span>
                    <span className="text-gray-900 font-medium">{product.title}</span>
                </nav>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-12">

                        <div className="space-y-4">
                            <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden">
                                <Image
                                    src={product.image || '/placeholder.jpg'}
                                    alt={product.title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>

                            {product.images && product.images.length > 1 && (
                                <div className="grid grid-cols-4 gap-4">
                                    {product.images.map((img: string, idx: number) => (
                                        <div key={idx} className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden 
                                        cursor-pointer hover:opacity-75 transition">
                                            <Image
                                                src={img}
                                                alt={`${product.title} ${idx + 1}`}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                    {product.title}
                                </h1>

                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center">
                                        {[...Array(5)].map((_, i) => (
                                            <BiStar
                                                key={i}
                                                className={`w-5 h-5 ${i < Math.floor(product.rating || 0)
                                                    ? 'fill-yellow-400 text-yellow-400'
                                                    : 'text-gray-300'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-sm text-gray-600">
                                        {product.rating || 0} ({product.reviews || 0} reviews)
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-baseline space-x-3">
                                <span className="text-4xl font-bold text-gray-900">
                                    ${product.price}
                                </span>
                                {product.originalPrice && (
                                    <span className="text-2xl text-gray-500 line-through">
                                        ${product.originalPrice}
                                    </span>
                                )}
                                {product.discount && (
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                                        {product.discount}% OFF
                                    </span>
                                )}
                            </div>

                            <div className="prose prose-sm text-gray-600">
                                <p>{product.description}</p>
                            </div>


                            {product.stock !== undefined && (
                                <div className="flex items-center space-x-2">
                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${product.stock > 0
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-red-100 text-red-800'
                                        }`}>
                                        {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                                    </span>
                                </div>
                            )}

                            {/* Quantity Selector */}
                            <div className="flex items-center space-x-4">
                                <label className="text-sm font-medium text-gray-700">Quantity:</label>
                                <div className="flex items-center border border-gray-300 rounded-lg">
                                    <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 transition">-</button>
                                    <input
                                        type="number"
                                        className="w-16 text-center border-x border-gray-300 py-2 focus:outline-none"
                                        defaultValue="1"
                                        min="1"
                                    />
                                    <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 transition">+</button>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition flex items-center justify-center space-x-2">
                                    <CgShoppingCart className="w-5 h-5" />
                                    <span>Add to Cart</span>
                                </button>

                                <button className="border-2 border-gray-300 text-gray-700 px-6 py-4 rounded-lg font-semibold hover:border-gray-400 transition flex items-center justify-center">
                                    <BiHeart className="w-5 h-5" />
                                </button>

                                <button className="border-2 border-gray-300 text-gray-700 px-6 py-4 rounded-lg font-semibold hover:border-gray-400 transition flex items-center justify-center">
                                    <CiShare2 className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="border-t border-gray-200 pt-6 space-y-4">
                                <div className="flex items-center space-x-3 text-sm text-gray-600">
                                    <BsTruck className="w-5 h-5 text-purple-600" />
                                    <span>Free shipping on orders over $50</span>
                                </div>
                                <div className="flex items-center space-x-3 text-sm text-gray-600">
                                    <BiShield className="w-5 h-5 text-purple-600" />
                                    <span>1 year warranty included</span>
                                </div>
                                <div className="flex items-center space-x-3 text-sm text-gray-600">
                                    <FiRotateCcw className="w-5 h-5 text-purple-600" />
                                    <span>30-day return policy</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional Details Section */}
                <div className="mt-8 bg-white rounded-lg shadow-sm p-6 lg:p-12">
                    <div className="border-b border-gray-200">
                        <nav className="flex space-x-8">
                            <button className="border-b-2 border-purple-600 py-4 px-1 text-sm font-medium text-purple-600">
                                Details
                            </button>
                            <button className="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                                Specifications
                            </button>
                            <button className="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                                Reviews
                            </button>
                        </nav>
                    </div>

                    <div className="py-8">
                        <div className="prose prose-sm max-w-none text-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Details</h3>
                            <p>{product.detailedDescription || product.description}</p>

                            {product.features && (
                                <>
                                    <h4 className="text-md font-semibold text-gray-900 mt-6 mb-3">Key Features</h4>
                                    <ul className="space-y-2">
                                        {product.features.map((feature: string, idx: number) => (
                                            <li key={idx}>{feature}</li>
                                        ))}
                                    </ul>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page

//console.log(_id[0])
import React from 'react'
// import ProductListCL from "@/app/components/ProductListCL"
import { Product } from '../utils/type'
import Image from 'next/image'

const ProductListS = async () => {
    const products: Product[] = await fetch(
        "https://fakestoreapi.com/products/"
    ).then((res) => res.json())
    return (
        <div className='flex justify-center items-center gap-2'>
            <h1 className="text-2xl font-bold text-center my-5">All Products </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6 ml-36/">
                {products.map((each) => (
                    <div key={each.id} >
                        <div className="flex gap-5">
                            <div className="size-70 border border-gray-100 shadow-md shadow-gray-100  bg-white flex flex-col 
                            items-center justify-center gap-2 p-5 rounded-lg">
                                <Image className="size-20"
                                    src={each.image}
                                    alt={each.title}
                                    width={200}
                                    height={200}
                                />

                                <p className="font-semibold text-sm text-center">{each.title}</p>
                                <h1 className='capitalize'>{each.category}</h1>
                                <em>${each.price}</em>

                                <div className="flex gap-5">
                                    <button className="bg-zinc-200 px-3 font-semibold hover:bg-zinc-300 py-2 rounded-xl">Add to Cart</button>
                                    <button className="bg-emerald-500 font-semibold text-white hover:bg-emerald-300 px-3 py-2 rounded-xl">Buy Now</button>
                                </div>
                            </div>

                        </div>
                    </div>
                ))
                }

            </div >
            {/* <ProductListCL /> */}
        </div>

    )
}

export default ProductListS
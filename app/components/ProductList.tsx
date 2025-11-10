"use client"

import { useEffect, useState } from "react"


interface Product {
    id: number
    image: string
    title: string
    category: string
    price: number
    rating: number
}

const ProductList = () => {
    const [products, setProducts] = useState<Product[]>([])
    useEffect(() => {
        const fetchProducts = async () => {
            const data = await fetch("https://fakestoreapi.com/products/").then(
                (response) => response.json()
            )
            console.log(data);
            setProducts(data)
        }
        fetchProducts()

    }, [])

    return (
        <div className="grid grid-cols-5 gap-3 mx-2">
            {products.map((each) => (
                <div key={each.id} >
                    <div className="flex gap-5">
                        {/* <p>{each.id}.</p> */}
                        <div className="size-70 border flex flex-col items-center justify-center gap-2">
                            <img className="size-20" src={each.image} alt={each.title} />
                            <p className="font-semibold text-sm text-center">{each.title}</p>
                            <h1>{each.category}</h1>
                            {/* <span><BsStarFill size={10} fill="gold" />{rating.rate} </span> */}
                            <em>${each.price}</em>

                            <div className="flex gap-5">
                                <button className="bg-zinc-200 px-3 hover:bg-zinc-300 py-2 rounded-xl">Add to Cart</button>
                                <button className="bg-emerald-500 hover:bg-emerald-200 px-3 py-2 rounded-xl">Buy</button>
                            </div>
                        </div>

                    </div>
                </div>
            ))
            }

        </div >
    )
}

export default ProductList
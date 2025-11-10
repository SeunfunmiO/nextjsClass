"use client"

import { useEffect, useState } from "react"

interface UserProfile {
    id: number
    productId:number
    quantity:number
}

const CartList = () => {
    const [cartItems, setCartItems] = useState<UserProfile[]>([])
    useEffect(() => {
        const fetchCartItems = async () => {
            const result = await fetch('https://fakestoreapi.com/carts')
                .then((res) => res.json()
                )
            console.log(result);
            setCartItems(result)
        }
        fetchCartItems()
    }, [])
    return (
        <div>
            {cartItems.map((each) => (
                <div key={each.id}>
                    <h3 className="font-bold text-xl">{each.productId}</h3>
                </div>
            ))}
        </div>
    )
}

export default CartList
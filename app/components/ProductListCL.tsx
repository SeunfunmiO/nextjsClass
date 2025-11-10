"use client"


import React from 'react'
import useSWR from 'swr'
import { Product } from '../utils/type'
import { BarLoader } from 'react-spinners'

//?. - null safe operator

const fetcher = (url: string) => fetch(url).then(res => res.json())

const ProductListCL = () => {
    const { data, isLoading, error } = useSWR<Product[]>("https://fakestoreapi.com/products/", fetcher)

    if (isLoading) {
        return <BarLoader className='m-5 flex justify-center items-center h-full' />
    }
    if (error) {
        return "Error fetching data"
    }

    return (
        <div>ProductList

            <div>
                {
                    //{response.data?.map((each)=> <div key={each.id}></div>)}
                    data && data?.map((each) =>
                        <div key={each.id}>
                            <div className="flex items-center gap-2">
                                <p>{each.id}</p>
                                <div>{each.title}</div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default ProductListCL
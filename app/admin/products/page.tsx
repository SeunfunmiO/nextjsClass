// import ProductListCL from "@/app/components/ProductListCL"
import { Suspense } from "react"
import Loading from "./loading"
import ProductListS from "@/app/components/ProductListS"
// import styles from './products.module.css'
// import { Product } from "@/app/utils/type"



const Page = async () => {
    // const products: Product[] = await fetch("https://fakestoreapi.com/products/").then(
    //     (res) => res.json())
    return (
        <div>
            {/* <h1 className="text-2xl font-bold text-center my-5">All Products </h1>
            <div className="grid grid-cols-4 gap-3 m-2">
                {products.map((each) => (
                    <div key={each.id} >
                        <div className="flex gap-5">
                            <div className="size-70 border flex flex-col items-center justify-center gap-2 p-5 rounded-lg">
                                <img className="size-20" src={each.image} alt={each.title} />
                    
                                <p className="font-semibold text-sm text-center">{each.title}</p>
                                <h1>{each.category}</h1>
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

            </div > */}
            <Suspense fallback={ <Loading/>}>
                <ProductListS />
            </Suspense>

            {/* <div className={styles.card}></div> */}
        </div>
    )
}

export default Page
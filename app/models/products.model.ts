import mongoose, { models } from "mongoose"

interface IProduct {
    name: string
    title: string
    price: number
    description: string
    quantity: number
    image: string
}

const ProductSchema = new mongoose.Schema<IProduct>({
    name: { required: true, type: String },
    title: { required: true, type: String },
    price: { required: true, type: Number },
    description: { required: true, type: String },
    quantity: { required: true, type: Number },
    image: { required: true, type: String }
})

const ProductModel = models.product<IProduct> || mongoose.model('product', ProductSchema)

export default ProductModel
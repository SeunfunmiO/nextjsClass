"use server"

import { revalidatePath } from "next/cache";
import dbConnect from "./dbConnect";
import ProductModel from "../models/products.model";
import UserModel from "../models/user";
import * as bcrypt from "bcrypt"
import { decrypt, encrypt } from "./session";
import { cookies } from "next/headers";
import cloudinary from "./cloudinary";


// import { refresh } from "next/cache";

// export const addProduct = async (form: FormData) => {
//     const title = form.get("title") as string;
//     const price = form.get("price") as string;

//     console.log({
//         title,
//         price: parseFloat(price)
//     });

// }

export const addProduct = async (
    form: {
        name: string,
        title: string,
        price: string,
        description: string,
        quantity: string
        image: string,
    }) => {
    try {
        await dbConnect()
        const existingTitle = await ProductModel.findOne({ name: form.name })

        if (existingTitle) {
            return {
                success: false,
                message: 'Product already exists'
            }
        }

        const postData = {
            name: form.name,
            title: form.title,
            price: form.price,
            description: form.description,
            quantity: form.quantity,
            image: form.image,
        }
        await ProductModel.create(postData)
        revalidatePath("/admin/products-db")
        return { ...postData, success: true }
    } catch (error) {
        return { success: false, message: 'Something went wrong' }
    }


    // const post = {
    // title: form.title,
    // price:form.price
    // price: parseFloat(form.price)
    // }
    // console.log({
    //     title: form.title,
    //     price: parseFloat(form.price)
    // });

    // refresh()

}

export const deleteProduct = async (id: string) => {
    try {
        await dbConnect()
        await ProductModel.findByIdAndDelete(id)

        revalidatePath("/admin/products-db")

        return {
            success: true,
            message: "Product deleted successfully"
        }

    } catch (error) {
        console.log(error);
        return { success: false, message: 'Error deleting product' }
    }
}

export const editProduct = async (id: string, data: any) => {
    try {
        await dbConnect()
        await ProductModel.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true,
        });

        revalidatePath("/admin/products-db")

        return {
            success: true,
            message: "Product updated successfully"
        }
    } catch (error) {
        console.log(error);
        return { success: false, message: 'Error updating product' }
    }
}

export const deleteAllProduct = async () => {
    try {
        await dbConnect()
        await ProductModel.deleteMany()

        revalidatePath("/admin/products-db")

        return {
            success: true,
            message: "Products deleted successfully"
        }

    } catch (error) {
        console.log(error);
        return { success: false, message: 'Error deleting products' }
    }
}


export const signUp = async (userData: {
    firstname: string
    email: string
    lastname: string
    password: string
    photo?: string
    aboutme?: string
    location: string
    website: string
    occupation: string
}) => {
    try {
        await dbConnect()

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(userData.password, salt)
        userData.password = hash


        let uploadedImage;

        if (userData.photo) {
            uploadedImage = await cloudinary.uploader.upload(userData.photo, {
                folder: "nextjsclass/users",
                transformation: [
                    { width: 500, height: 500, crop: 'fill' }
                ]
            })
        }

        const result = await UserModel.create({
            ...userData,
            photo: uploadedImage?.secure_url
        });

        if (!result) {
            return {
                success: false,
                message: "An error occured"
            }
        }



        return {
            success: true,
            message: "User registered successfully"
        }
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: "Error registering user"
        }
    }
}

export const signIn = async (userData: {
    email: string,
    password: string
    id: string
}) => {

    await dbConnect()
    const user = await UserModel.findOne({ email: userData.email }).select("+password")

    if (!user) {
        return {
            success: false,
            message: "Invalid Credentials"
        }
    }

    const validPassword = await bcrypt.compare(userData.password, user.password)
    if (!validPassword) {
        return {
            success: false,
            message: "Invalid Credentials",
        }
    }

    const cookieStore = await cookies()
    const token = await encrypt({ _id: user._id.toString() })
    cookieStore.set("token", token, {
        httpOnly: true,
        secure: true,
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        sameSite: "lax",
        path: '/',
    })


    return {
        success: true,
        message: "User is signed in",
    }
}

export const getUser = async () => {
    await dbConnect()
    try {
        const cookieStore = await cookies()

        const token = cookieStore.get("token")?.value;

        if (!token) {
            return {
                success: false,
                message: "No token found"
            }
        }

        const decrypted = await decrypt(token)

        const user = await UserModel.findById({ _id: decrypted._id })

        if (!user) {
            return {
                success: false,
                message: "User not found"
            }
        }


        const fetchedUser = {
            id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            photo: user.photo,
            aboutme: user.aboutme,
            email: user.email,
            occupation: user.occupation,
            location: user.location,
            website: user.website,
            createdAt: user.createdAt
        }

        const plainUser = JSON.parse(JSON.stringify(fetchedUser))

        return {
            success: true,
            message: "User retrieved successfully",
            user: plainUser,
            decryptedToken: decrypted
        }

    } catch (error) {
        console.log("Get User Error : ", error);
        return {
            success: false,
            message: "Server error"
        }
    }
}

export const updateUser = async (data: {
    email: string,
    firstname: string,
    lastname: string,
    website: string,
    location: string,
    occupation: string,
    photo: string,
    aboutme: string
}) => {
    await dbConnect();

    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return { success: false, message: "No token found" };
        }

        const decrypted = await decrypt(token);

        if (!decrypted.success) {
            return { success: false, message: "Session expired" };
        }

        const existingUser = await UserModel.findById(decrypted._id);

        if (!existingUser) {
            return { success: false, message: "User not found" };
        }

        const updatedUser = await UserModel.findByIdAndUpdate(
            decrypted._id,
            {
                email: data.email,
                firstname: data.firstname,
                lastname: data.lastname,
                website: data.website,
                location: data.location,
                occupation: data.occupation,
                photo: data.photo,
                aboutme: data.aboutme
            },
            { new: true }
        );

        const plainUser = JSON.parse(JSON.stringify(updatedUser))

        revalidatePath("/user-dashboard");

        return {
            success: true,
            message: "Profile updated",
            user: plainUser
        };

    } catch (error) {
        console.log("Update user error : ", error);
        return { success: false, message: "Error updating user" };
    }
};

export const logOut = async () => {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.delete("token")

        if (!token) {
            return {
                success: false,
            }
        }
        //redirect("/signin")

        return { success: true }
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message:"Error signing out"
        }
    }

}

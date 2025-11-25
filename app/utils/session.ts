import { jwtVerify, SignJWT } from "jose";
import "server-only"
import { jwtPayload } from "./type";
import { cookies } from "next/headers";
import UserModel from "../models/user";
import dbConnect from "./dbConnect";

const encodedKey = new TextEncoder().encode(process.env.JWT_SECRET);

export const encrypt = (payload: { _id: string }) => {
    const token = new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime("2d")
        .sign(encodedKey)

    return token
}

export const decrypt = async (token: string): Promise<jwtPayload> => {
    try {
        const { payload } = await jwtVerify(token, encodedKey, { algorithms: ['HS256'] })
        //{payload:{_id:""}}
        return { ...payload, success: true }
    } catch (error) {
        return { success: false }
    }
}

export const auth = async () => {
    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value

    if (!token) {
        return {
            success: false,
        }
    }

    const { _id, success } = await decrypt(token)

    if (!success) {
        return { success: false }
    }

    return { _id, success: true }
}

export const verifyUser = async () => {
    const { success, _id } = await auth()

    if (!success) {
        return { success: false }
    }
    await dbConnect()
    const user = await UserModel.findById(_id)

    if (!user) {
        return { success: false }
    }

    return { success: true, user }
}



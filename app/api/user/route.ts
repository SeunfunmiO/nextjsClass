import UserModel from "@/app/models/user"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (req: NextRequest, res: NextResponse) => {
    const users = await UserModel.find()

    // const users = [
    //     { firstname: "Felix", lastname: "Adegboyega", age: "16" },
    //     { firstname: "Cynthia", lastname: "Omisore", age: "25" },
    //     { firstname: "Quadri", lastname: "Adejumobi", age: "32" },
    //     { firstname: "Gentuu", lastname: "Azeez", age: "20" },
    // ]

    return NextResponse.json({
        success: true, users
    })
}

export const PUT = async () => {

}

export const DELETE = () => {

}
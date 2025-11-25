import UserModel from "@/app/models/user";
import dbConnect from "@/app/utils/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, ctx: RouteContext<'/api/user/[_id]'>) => {
    try {
        const { _id } = await ctx.params;

        await dbConnect()
        const user = await UserModel.findById(_id)
        if (!user) {
            return NextResponse.json({
                success: false,
                message: "No user found"
            }, { status: 404 })
        }

        return NextResponse.json({
            success: true, user
        }, { status: 200 })
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "No user found"
        }, { status: 500 })
    }
}
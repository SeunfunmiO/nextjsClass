import UserModel from '@/app/models/user'
import { Metadata } from 'next'
import { getUser } from '@/app/utils/action';

export const generateMetadata = async ({ params }: { params: Promise<{ _id: string }> }): Promise<Metadata> => {
    const { _id } = await params
    const user = await UserModel.findById(_id)

    return {
        title: user.name,
        description: user.occupation,
        openGraph: {
            images: {
                url: user.image
            }
        }
    }
}


export async function GET(req: Request, { params }: { params: { id: string } }) {
    const id = params.id
    const data = await getUser(id)
    return new Response(JSON.stringify(data), { status: 200 })
}
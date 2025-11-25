"use client"

import { use } from 'react'




const Page = async ({ params }: { params: Promise<{ _id: string }> }) => {
    const { _id } = use(params)
   

    return (
        <div>This is a single product ({_id}) page.</div>
    )
}

export default Page 
import React from 'react'

const Notfound = () => {
    return (
        <div className='flex items-center flex-col gap-2 justify-center text-center p-4 h-screen '>
            <h3 className="font-bold text-6xl">404</h3>

            <p className="text-xl text-gray-700">Looks like you are lost</p>
            <button className="border-2 border-black hover:text-white hover:bg-black text-lg px-5 py-2 rounded-xl mt-5 font-medium">
                Go Home
            </button>
        </div>
    )
}

export default Notfound
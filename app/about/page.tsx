import React from 'react'

const page = () => {
  return (
    <div className='w-screen p-4 max-w-80 border m-8 '>
      <p className="text-teal-300 font-bold mb-3 ">5-day mini-course</p>
      <h1 className="text-xl font-bold mb-5">Build UIs that don&apos;t suck.</h1>
      <p className="leading-8 text-gray-300 w-fit mb-5">
        Short, tactical video lessons from the creator of Tailwind CSS,
        delivered directly to your inbox
        everyday for a week
      </p>
      <button className="py-2 px-4 rounded-full bg-gray-400"> Get the free course </button>
    </div>
  )
}

export default page 
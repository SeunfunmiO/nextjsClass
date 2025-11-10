import React from 'react'

const page = () => {
  return (
   <div>
     <div className='text-[10rem] text-primary animate-bounce'>Admin Dashboard</div>
     <p className="text-3xl animate-pulse p-12">Hello</p>
     <div className='text-9xl transition hover:translate-y-10 cursor-pointer '>Login</div>
     <div className="group p-10 size-96 border-pink-400 border m-20 rounded-[4rem] skew-x-12 [box-shadow:5px_10px_#ccc]">
      <div className="bg-pink-500 animate-spin border border-pink-100 size-20 group-hover:scale-50 transition-all"></div>
     </div>
     <h1 className='text-3xl [line-height:3rem] bg-amber-300'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, dignissimos?</h1>
   </div>
  
  )
}

export default page
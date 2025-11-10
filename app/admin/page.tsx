import Button from "../components/Button"


const page = () => {
  return (
    <div>
      <h3 className="lg:text-4xl text-lg lg:text-center font-bold my-8 text-slate-500 text-start">Flex Layout</h3>

      <div className='flex justify-evenly mt-5 gap-4 md:flex-row flex-col sm:gap-10 flex-wrap items-center'>
        <div className='md:flex-1 min-w-40 size-40 bg-slate-300'></div>
        <div className='md:flex-1 min-w-40 size-40 bg-slate-400'></div>
        <div className='md:flex-1 min-w-40 size-40 bg-slate-500'></div>
        <div className='md:flex-1 min-w-40 size-40 bg-slate-300'></div>
        <div className='md:flex-1 min-w-40 size-40 bg-slate-400'></div>
        <div className='md:flex-1 min-w-40 h-46 bg-slate-500'></div>
        <div className='md:flex-1 min-w-40 size-40 bg-slate-300'></div>
        <div className='md:flex-1 min-w-40 size-40 bg-slate-400'></div>
        <div className='md:flex-1 min-w-40 size-40 bg-slate-500'></div>
      </div>


      <div>
        <h3 className='text-zinc-500 md:underline text-4xl text-center font-bold my-8'>Grid Layout</h3>
        <div className='grid grid-cols-6 gap-4'>
          <div className='border h-20 border-zinc-400'></div>
          <div className='border h-20 border-zinc-400'></div>
          <div className='border h-20 border-zinc-400 col-span-2'></div>
          <div className='border h-20 border-zinc-400'></div>
          <div className='border h-20 border-zinc-400 col-start-2'></div>
          <div className='border h-20 border-zinc-400'></div>
          <div className='border h-20 border-zinc-400'></div>
          <div className='border h-20 border-zinc-400 col-span-4'></div>
        </div>
      </div>

      <form action="" className="p-20">
        <input type="text" className="border border-l-4 px-8 py-2.5 outline-none border-gray-300 rounded-lg
        placeholder:text-cyan-700 focus:border-gray-500" placeholder="Username" />
        <Button text={'Register'} />
      </form>

    </div>
  )
}

export default page
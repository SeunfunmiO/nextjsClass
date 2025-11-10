"use client"

const Button = ({ text }: { text: string }) => {
    return (
        <div>
            <button className="rounded-lg px-8 py-2 cursor-pointer my-3 text-white bg-teal-700 hover:bg-teal-900
      transition-all/ font-medium duration-700/ hover:translate-y-2/ hover:px-12/">
                {text}</button>
        </div>
    )
}

export default Button
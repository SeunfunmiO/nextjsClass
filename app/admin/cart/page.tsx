import CartList from '@/app/components/CartList'
import { BiCart } from 'react-icons/bi'

const Page = () => {
  return (
    <div>
      <h1 className="font-bold text-2xl flex items-center gap-3">My Cart <BiCart /></h1>
      <CartList />
    </div>
  )
}

export default Page
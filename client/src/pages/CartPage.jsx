import React from 'react'
import Layout from '../components/Layout'
import { useCart } from '../context/cart'
import { useAuth } from '../context/auth'
import { useNavigate } from 'react-router-dom'


function CartPage() {
    const [cart,setCart] = useCart()
    const [auth,setAuth]  =useAuth()
    const navigate  = useNavigate()

    const totalPrice = ()=> {
        try {
          let total = 0
          cart?.map((item) => {total = total + item.price})
        return total
        } catch (error) {
          console.log(error)
        }
      }

    const removeCartItem = (pid) => {
        try {
            let myCart  = [...cart]
            let index = myCart.findIndex(item => item._id === pid)
            myCart.splice(index,1)
            setCart(myCart)
            localStorage.setItem('cart',JSON.stringify(myCart))
        } catch (error) {
            console.log(error)
        }

    }
  return (
    <>
    <Layout>
        <div className="min-w-full text-center p-4">
            <h1 className="text-4xl font-bold mb-4">Your Cart</h1>
            <h1 className="text-2xl mb-4">
                {auth?.token && auth?.user?.name} {cart?.length >= 1 ? `You have ${cart.length} items in the cart` : 'Your cart is empty'}
            </h1>
            <h1 className="text-2xl mb-6">
                {cart?.length > 1 ? `You have ${cart.length} items in the cart` : 'Your cart is empty'}
            </h1>
        </div>

        <div className="min-w-full flex min-h-screen p-4">
            <div className="w-full md:w-1/2 text-center p-4">
                <div>
                    {cart?.map(item => (
                        <div className="flex flex-col md:flex-row items-center justify-between p-4 mb-4 rounded-md shadow-md w-full bg-white" key={item._id}>
                            <img src={`http://localhost:8080/product/product-photo/${item._id}`} alt={item.name} className="h-48 w-full md:w-1/3 rounded-md mb-4 md:mb-0 mr-0 md:mr-4" />
                            <div className="flex flex-col text-start w-full md:w-2/3">
                                <ul>
                                    <li className="text-3xl font-bold mb-4">{item.name}</li>
                                    <li className="text-indigo-500 text-xl mb-4"><span className='text-black'>By:</span> {item.author}</li>
                                    <li className="text-2xl font-bold text-red-500 mb-4">₹ {item.price}</li>
                                </ul>
                            </div>
                            <div className="flex justify-center md:justify-start items-center mt-4 md:mt-0">
                                <button
                                onClick={() => removeCartItem(item._id)}
                                className="relative px-8 py-2 rounded-md bg-white isolation-auto z-10 border-2 border-red-700 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full hover:text-white before:-right-full before:hover:right-0 before:rounded-full before:bg-[#A12347] before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700 inline-flex items-center justify-center text-sm font-semibold text-black bg-white border border-gray-200 rounded-lg shadow-sm gap-x-2 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="w-full md:w-1/2 text-center p-4 bg-white rounded-md shadow-md">
                <h1 className="text-4xl font-bold mb-4">Cart Summary</h1>
                <p className="text-xl mb-4">TOTAL | CHECKOUT | PAYMENT</p>
                <hr className="mb-4" />
                <h1 className="text-3xl font-bold">Total: ₹ {totalPrice()} </h1>
            </div>
        </div>   
    </Layout>
    </>
  )
}

export default CartPage
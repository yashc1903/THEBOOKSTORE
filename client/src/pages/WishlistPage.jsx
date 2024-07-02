import React from 'react'
import Layout from '../components/Layout'
import { useAuth } from '../context/auth'
import { useNavigate } from 'react-router-dom'
import { useWishlist } from '../context/wishllist'
import '../components/wishlist.css'
import { useCart } from '../context/cart'
import toast from 'react-hot-toast'


function WishlistPage() {
    const [auth,setAuth]  =useAuth()
    const [wishlist,setWishlist] = useWishlist()
    const [cart,setCart] = useCart()
    const navigate  = useNavigate()

    const removeWishlistItem = (pid) => {
        try {
            let myWishlist  = [...wishlist]
            let index = myWishlist.findIndex(item => item._id === pid)
            myWishlist.splice(index,1)
            setWishlist(myWishlist)
            localStorage.setItem('wishlist',JSON.stringify(myWishlist))
        } catch (error) {
            console.log(error)
        }

    }

  return (
    <>
    <Layout>
        <div className="min-w-full text-center p-4">
            <h1 className="text-4xl font-bold mb-4">Your Wishlist</h1>
            <h1 className="text-2xl mb-4">
               <span className=' text-emerald-600 text-3xl'>{auth?.token && auth?.user?.name} </span>  {wishlist?.length >= 1 ? `You have ${wishlist.length} items in the wishlist` : 'Your wishlist is empty'}
            </h1>
            
        </div>

        <div className="min-w-full flex min-h-screen p-4">
            <div className="w-full text-center p-4">
            <h1 className="text-4xl font-bold mb-4">wishlist Items</h1>
                <div>
                    {wishlist?.map(item => (
                        <div className="flex flex-col md:flex-row items-center justify-between p-4 mb-4 rounded-md shadow-2xl w-full bg-white bg-opacity-60" key={item._id}>
                            <img src={`http://localhost:8080/product/product-photo/${item._id}`} alt={item.name} className="h-48 w-full md:w-1/3 rounded-md mb-4 md:mb-0 mr-0 md:mr-4 object-contain" />
                            <div className="flex flex-col text-start w-full md:w-2/3">
                                <ul>
                                    <li className="text-3xl font-bold mb-4">{item.name}</li>
                                    <li className="text-indigo-500 text-xl mb-4"><span className='text-black'>By:</span> {item.author}</li>
                                    <li className="text-2xl font-bold text-red-500 mb-4">₹ {item.price}</li>
                                </ul>
                            </div>
                            <div className="flex justify-center md:justify-start items-center mt-4 md:mt-0">
                                <button
                                onClick={() => removeWishlistItem(item._id)}
                                className="relative px-8 py-2 rounded-md bg-white isolation-auto z-10 border-2 border-red-700 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full hover:text-white before:-right-full before:hover:right-0 before:rounded-full before:bg-[#A12347] before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700 inline-flex items-center justify-center text-sm font-semibold text-black bg-white border border-gray-200 rounded-lg shadow-sm gap-x-2 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                                >
                                    Remove
                                </button>
                                <button
                                onClick={()=>{
                                    setCart([...cart,item])
                                    localStorage.setItem('cart',JSON.stringify([...cart,item]))
                                    toast.success(` "${item.name}" added to the cart`)
                                    removeWishlistItem(item._id)
                                  }}
                                className=" relative px-8 py-2 w-40  ml-2 h-10 rounded-md bg-white isolation-auto z-10 border-2 border-blue-700 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full hover:text-white before:-right-full before:hover:right-0 before:rounded-full before:bg-[#355ac0] before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700 inline-flex items-center justify-center text-sm font-semibold text-black bg-white border border-gray-200 rounded-lg shadow-sm gap-x-2 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                                >
                                    Add to cart 
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
        </div>   
    </Layout>
    </>
  )
}

export default WishlistPage
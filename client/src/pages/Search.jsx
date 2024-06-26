import React from 'react'
import Layout from '../components/Layout'
import { useSearch } from '../context/search'
import { useCart } from '../context/cart'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAuth } from '../context/auth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { useWishlist } from '../context/wishllist.jsx'

function Search() {
    const [values,setValues] = useSearch()
    const [cart , setCart] = useCart()
    const [auth] = useAuth()
    const [wishlist,setWishlist] = useWishlist()
    const navigate = useNavigate()
  return (
    <>
    <Layout>
    <div className="text-center mb-6 mt-10">
    <h1 className="text-4xl font-bold text-gray-700">Search Results</h1>
    <h1 className="text-3xl text-gray-600 mt-2">
      {values?.results.length < 1 ? "No products found" : `Found ${values?.results.length} products`}
    </h1>
  </div>
            <div className='ml-4 flex flex-wrap gap-10 justify-center mb-4'>

            {values.results.map((product) => (
              <div
                key={product._id}
                className="hover:z-50 w-96 "
              >
                <div
                  className="card bg-white border-2 border-gray-800 shadow-lg rounded-lg flex flex-col justify-between p-4 gap-4 h-full transform transition-transform duration-300 hover:scale-110 hover:z-10"
                >
                  <div className="card-img transition-all duration-500 flex justify-center">
                    <img
                      src={`http://localhost:8080/product/product-photo/${product._id}`}
                      alt="Product"
                      className="w-full h-80 object-contain rounded-lg"
                    />
                  </div>
                  <div className="card-title text-center text-xl font-bold text-gray-800">
                    {product.name}
                  </div>
                  <div className="card-title text-center text-lg font-semibold text-gray-800">
                    {product.author}
                    <span className="text-sm text-blue-500 ml-4">(Author)</span>
                  </div>
                  <div className="card-subtitle text-sm line-clamp-3 text-gray-600 ">
                    {product.description}
                  </div>
                  <div className="card-footer flex justify-between items-center mt-auto">
                    <div className="card-price text-xl font-semibold text-gray-800">
                      <span className="text-gray-600">₹</span>
                      {` ${product.price}`}
                    </div>
                    <button className="w-36 h-10 rounded-md p-6 py-2  border-2 border-black font-sm text-gray-800 bg-transparent cursor-pointer transition-all duration-300 relative  shadow-inner shadow-gray-300 hover:shadow-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    onClick={()=>navigate(`/product/${product.slug}`)}>
                      More Details
                    </button>
                    <div className="inline-block" key={product._id}>
                      <FontAwesomeIcon
                      icon={ faHeart }
                      className={`cursor-pointer  `}
                      size="2xl"
                      onClick={()=>{
                                
                                setWishlist([...wishlist,product])
                              localStorage.setItem('wishlist',JSON.stringify([...wishlist,product]))
                              toast.success(` "${product.name}" added to the wishlist`)
                             }}
                       />
                    </div>
                    {auth?.user?.role !== 1 && 
                    
                    <button
                    onClick={()=>{
                      setCart([...cart,product])
                      localStorage.setItem('cart',JSON.stringify([...cart,product]))
                      toast.success(` "${product.name}" added to the cart`)
                    }}
                    className="card-btn border-2 hover:scale-110 border-gray-800 rounded p-2 transition-all duration-300 hover:border-blue-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        className="w-5 h-5 fill-gray-800 transition-all duration-300 hover:fill-blue-500"
                      >
                        <path
                          d="m397.78 316h-205.13a15 15 0 0 1 -14.65-11.67l-34.54-150.48a15 15 0 0 1 14.62-18.36h274.27a15 15 0 0 1 14.65 18.36l-34.6 150.48a15 15 0 0 1 -14.62 11.67zm-193.19-30h181.25l27.67-120.48h-236.6z"
                        ></path>
                        <path
                          d="m222 450a57.48 57.48 0 1 1 57.48-57.48 57.54 57.54 0 0 1 -57.48 57.48zm0-84.95a27.48 27.48 0 1 0 27.48 27.47 27.5 27.5 0 0 0 -27.48-27.47z"
                        ></path>
                        <path
                          d="m368.42 450a57.48 57.48 0 1 1 57.48-57.48 57.54 57.54 0 0 1 -57.48 57.48zm0-84.95a27.48 27.48 0 1 0 27.48 27.47 27.5 27.5 0 0 0 -27.48-27.47z"
                        ></path>
                        <path
                          d="m158.08 165.49a15 15 0 0 1 -14.23-10.26l-25.71-77.23h-47.44a15 15 0 1 1 0-30h58.3a15 15 0 0 1 14.23 10.26l29.13 87.49a15 15 0 0 1 -14.23 19.74z"
                        ></path>
                      </svg>
                    </button>
                    }

                  </div>
                </div>
              </div>
            ))}
            </div>
        
    </Layout>
    </>
  )
}

export default Search
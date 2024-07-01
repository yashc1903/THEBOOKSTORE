import React ,{useState,useEffect} from 'react'
import Layout from '../components/Layout'
import {Prices} from '../components/Prices.js'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/cart.jsx'
import { CiHeart } from "react-icons/ci";
import axios from 'axios'
import {Button, Checkbox,Radio} from 'antd'
import toast from 'react-hot-toast'
import { useAuth } from '../context/auth.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { useWishlist } from '../context/wishllist.jsx'


function HomePage() {
    
    const [products,setProducts]  =useState([])
    const [categories,setCategories] = useState([])
    const [checked,setChecked] = useState([])
    const [radio,setRadio]  = useState([])
    const [total,setTotal]  = useState(0)
    const [page,setPage]  = useState(1)
    const [loading,setLoading] = useState(false)
    const [auth,setAuth]=  useAuth()
    

  

    //cart
    const [cart,setCart] = useCart()
    const [wishlist,setWishlist] = useWishlist()


    const navigate  =useNavigate()
    //get total count 

    


    const getAllCategory = async() => {
      try {
        const {data} = await axios.get('http://localhost:8080/category/categories')
        if(data?.success){
          setCategories(data?.category)
        }
      } catch (error) {
        console.log(error)
        
      }
    }

    const getTotal  = async() =>{
      try {
        const {data} = await axios.get(`http://localhost:8080/product/product-count`)
        setTotal(data?.total)
      } catch (error) {
        console.log(error)
        
      }

    }

    const handleFilter = (value,id) =>{
      let all = [...checked]
      if(value){
        all.push(id)
      }else{
        all = all.filter(category => category!== id)
      }
      setChecked(all)
    }
  
    useEffect(()=>{
      if(!checked.length || !radio.length) getAllCategory();
      
    },[checked.length,radio.length])

    useEffect(()=>{
      if(checked.length || radio.length) filterProduct()

    },[checked,radio])

    const getAllProducts = async() =>{
        try {
          setLoading(true)
          const {data}  =await axios.get(`http://localhost:8080/product/product-list/${page}`)
          setLoading(false)
          setProducts(data.products)
        } catch (error) {
          setLoading(false)
          console.log(error)
        }
    }

  useEffect(()=>{
    getAllProducts()
    getTotal()
  },[])

    const filterProduct = async() =>{
      try {
        const {data} = await axios.post(`http://localhost:8080/product/product-filters`,{checked,radio})
        setProducts(data?.products)
      } catch (error) {
        console.log(error)
        toast.error('something went wrong')
      }

    }

    //load more 

    const loadMore = async() => {
      try {
        setLoading(true)
        const {data} = await axios.get(`http://localhost:8080/product/product-list/${page}`)
        setLoading(false)
        setProducts([...products,...data?.products])

      } catch (error) {
        console.log(error)
        setLoading(false)
      }

    }
    useEffect(()=>{
      if(page === 1) return
      loadMore()
    },[page])

  return (
    <>
  <Layout>
      <div className="mt-3 p-6 flex flex-wrap md:flex-nowrap">
        <div className="w-full md:w-1/4 bg-gray-100 p-4 rounded-lg shadow-md">
        <div className="flex justify-center">
          <Button className="p-4 h-14 font-bold mb-4 text-xl rounded-md text-white bg-gray-600" onClick={() => window.location.reload()}>Reset Filters</Button>
        </div>
          <h1 className="text-center text-3xl font-bold text-gray-700 mb-4">
            Filter by Category
          </h1>
          {categories?.map((category) => (
            <Checkbox
              key={category._id}
              className="flex text-xl"
              onChange={(e) => {
                handleFilter(e.target.checked,category._id)
              }}
            >
              {category.name}
            </Checkbox>
          ))}
          <h1 className="text-center text-3xl font-bold text-gray-700 mb-4 mt-10">
            Filter by price
          </h1>
          <Radio.Group className='' onChange={(e)=>setRadio(e.target.value)}>
              {Prices?.map(p => (
                <div key={p._id}>

                  <Radio className='text-xl' value={p.array}>{p.name}</Radio>
                </div>
              ))}
          </Radio.Group>
        </div>

        <div className="w-full md:w-3/4 mt-6 md:mt-0 md:ml-6">

        
          <h1 className="text-center text-6xl font-semibold text-gray-700 mb-4">
            All Products
          </h1>
          <div className="grid   grid-cols-3  gap-4">
          {products?.map((product) => (
              <div
                key={product._id}
                className="hover:z-50"
                
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
                      <span className="text-gray-600">₹ </span>
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
          <div className=' w-full flex justify-center mt-4 text-white text-2xl  font-bold'> 
            {products && products.length < total && (
              <button 
              className=' p-4 bg-gray-500 rounded-full border-2 border-black  w-56 '
              onClick={(e)=>{
                e.preventDefault()
                setPage(page+1)
              }}
              >
                {loading ? "Loading...." :"Load More"}
              </button>
            )}
          </div>
        </div>
      </div>
     
    </Layout>
</>
  )
}

export default HomePage

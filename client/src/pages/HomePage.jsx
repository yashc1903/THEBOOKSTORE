import React ,{useState,useEffect} from 'react'
import Layout from '../components/Layout'
import { useAuth } from '../context/auth'
import axios from 'axios'

function HomePage() {
    const [auth,setAuth]=useAuth()
    const [products,setProducts]  =useState([])
    const [categories,setCategories] = useState([])

    const getAllProducts = async() =>{
        try {
          const {data}  =await axios.get(`http://localhost:8080/product/get-products`)
          setProducts(data.products)
        } catch (error) {
          console.log(error)
        }
    }

    useEffect(()=>{getAllProducts()},[])

  return (
    <>
  <Layout>
    <div className="mt-3 p-6">
      <div className="w-full md:w-1/4 bg-gray-100 p-4 rounded-lg shadow-md">
        <h1 className="text-center text-xl font-semibold text-gray-700 mb-4">Filter by Category</h1>
      </div>
      <div className="mt-6 md:ml-6 flex-grow">
        <h1 className="text-center text-2xl font-semibold text-gray-700 mb-4">All Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products?.map((product) => (
            <div className="bg-white rounded-lg shadow-md p-4 w-full h-96" key={product._id}>
              <img
                src={`http://localhost:8080/product/product-photo/${product._id}`}
                alt="Product Image"
                className="w-full h-48 object-contain rounded-lg"
              />
              <div className="mt-4">
                <h2 className="text-lg font-bold text-gray-800">{product.name}</h2>
                <p className="text-gray-600 text-sm mt-2 line-clamp-3">{product.description}</p>
                <p className="text-gray-600 text-sm mt-2">{product.author}</p>
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

export default HomePage
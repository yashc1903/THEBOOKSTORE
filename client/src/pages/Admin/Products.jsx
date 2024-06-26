import Layout from '../../components/Layout'
import React from 'react'
import AdminMenu from '../../components/AdminMenu';
import { Modal } from 'antd';
import { useState,useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';


function Products() {
    const [products,setProducts]  = useState();
    const [loading,setLoading] = useState(false)
    const [page,setPage]  = useState(1)
    const [total,setTotal]  = useState(0)
    //get all products


    
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
    };

    const getTotal  = async() =>{
      try {
        const {data} = await axios.get(`http://localhost:8080/product/product-count`)
        setTotal(data?.total)
      } catch (error) {
        console.log(error)
        
      }

    }

    useEffect(()=>{
        getAllProducts()
        getTotal()
    },[])

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
    <div className="flex  justify-center items-center  min-w-full min-h-screen">
      <div className="w-1/3 p-4">
        <AdminMenu />
      </div>
      <div className=" w-2/3 p-4 border h-full overflow-auto">
        <div className="text-center">
          <h1 className="text-3xl w-full mt-10">ALL PRODUCTS LIST</h1>
          <div className="mt-4 grid md:grid-cols-3   gap-4 overflow-y-auto h-[calc(100vh-150px)]">
            {products?.map((product) => (
              <Link to={`/dashboard/admin/product/${product.slug}`} key={product._id}>
                <div className="bg-white rounded-lg shadow-md p-4 h-96">
                  <img
                    src={`http://localhost:8080/product/product-photo/${product._id}`}
                    alt="Product Image"
                    className="w-full h-48 object-contain rounded-lg"
                  />
                  <div className="mt-2">
                    <h2 className="text-lg font-bold text-gray-800">{product.name}</h2>
                    <p className="text-gray-600 text-sm mt-2 line-clamp-3">{product.description}</p>
                    <p className="text-gray-600 text-sm font-semibold mt-2">{product.author} (Author)</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
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

export default Products
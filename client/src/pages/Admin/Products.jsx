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
    //get all products
    
    const getAllProducts = async() =>{
        try {
            const {data} = await axios.get('http://localhost:8080/product/get-products')
            setProducts(data.products)
        } catch (error) {
            console.log(error)
            toast.error('something went wrong')
        }
    };

    useEffect(()=>{
        getAllProducts()
    },[])

  return (
    

<>
  <Layout>
    <div className="flex flex-col md:flex-row justify-around items-start md:items-center h-screen">
      <div className="w-full md:w-1/4 p-4">
        <AdminMenu />
      </div>
      <div className="w-full md:w-3/4 p-4 border h-full overflow-auto">
        <div className="text-center">
          <h1 className="text-3xl w-full mt-10">ALL PRODUCTS LIST</h1>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto h-[calc(100vh-150px)]">
            {products?.map((product) => (
              <Link to={`/dashboard/admin/product/${product.slug}`} key={product._id}>
                <div className="bg-white rounded-lg shadow-md p-4">
                  <img
                    src={`http://localhost:8080/product/product-photo/${product._id}`}
                    alt="Product Image"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <div className="mt-4">
                    <h2 className="text-lg font-bold text-gray-800">{product.name}</h2>
                    <p className="text-gray-600 text-sm mt-2 line-clamp-3">{product.description}</p>
                    <p className="text-gray-600 text-sm mt-2">{product.author}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  </Layout>
</>
  )
}

export default Products
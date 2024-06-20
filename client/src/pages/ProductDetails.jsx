import { Layout } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
    const params = useParams();
    const [product, setProduct] = useState({});
    const [relatedBooks, setRelatedBooks] = useState([])

    //inital product details
    useEffect(() => {
        if(params?.slug) getProduct()
    }, [params?.slug])

    //getproduct
    const getProduct = async () => {
        try{
            const {data} = await axios.get(`/api/v1/product/get-product/${params.slug}`)
            setProduct(data?.product)
            getSimilarBook(data?.product._id, data?.product.category._id)
        } catch(error) {
            console.log(error)
        }
    }

    //get similar books
    const getSimilarBook = async (pic, cid) =>{
        try {
            const {data} = await axios.get(`/api/v1/product/related-product/${pid}/${cid}`)
            setRelatedBooks(data?.products)
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <Layout>
        <div className="row container mt-2">
            <div className="col-md-6">image</div>
                <img
                    src={`http://localhost:8080/product/product-photo/${product._id}`}
                    alt="Product Image"
                    className="w-full h-48 object-cover rounded-lg"
                    height ="300"
                    width = {"350px"}
                />
            <div className="col-md-6 ">
                <h1 className="text-center">product Details</h1>
                <h6>Name : {product.name}</h6>
                <h6>Description : {product.description}</h6>
                <h6>Author : {product.author}</h6>
                <h6>Price : {product.price}</h6>
                {/* <h6>Category : {product.category.name}</h6> */}
            </div>
        </div>
        <hr />
        <div className="row container">
            <h6>Similar books</h6>
            {relatedBooks.length <1 && <p className=" text-center">No Similar Book Found</p>}
            <div className="grid   grid-cols-3  gap-4">
          {relatedBooks?.map((product) => (
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
                      <span className="text-gray-600">Rs</span>
                      {` ${product.price}`}
                    </div>
                    <button className="card-btn border-2 hover:scale-110 border-gray-800 rounded p-2 transition-all duration-300 hover:border-blue-500">
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
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
    </Layout>
  )
}

export default ProductDetails
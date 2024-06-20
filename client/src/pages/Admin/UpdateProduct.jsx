import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import AdminMenu from '../../components/AdminMenu'
import toast from 'react-hot-toast'
import axios from 'axios'
import { Select } from 'antd'
import { useNavigate,useParams } from 'react-router-dom'

function UpdateProduct() {
    const [categories,setCategories ] = useState([])
  const [photo,setPhoto]  =useState('')
  const [name,setName]  =useState('')
  const [description,setDescription]  =useState('')
  const [author,setAuthor]  =useState('')
  const [price,setPrice]  =useState('')
  const [category,setCategory]  =useState('')
  const [quantity,setQuantity]  =useState('')
  const [shipping,setShipping]  =useState('')
  const [id,setId] = useState('')
  const navigate =useNavigate()
  const params = useParams()

  const handleUpdate = async(e) => {
    e.preventDefault();
    try {
      const productData = new FormData()
      productData.append("name",name)
      productData.append("description",description)
      productData.append("author",author)
      productData.append("price",price)
      productData.append("category",category)
      photo   && productData.append("photo",photo)
      productData.append("quantity",quantity)
      productData.append('shipping',shipping)
      const {data} = axios.put(`http://localhost:8080/product//update-product/${id}`,productData)
      if(data?.success){
       
        toast.error(data?.message)
      }
      else{
        toast.success('Product updated Successfully')
        navigate('/dashboard/admin/products')
        
      }
    } catch (error) {
      console.log(error)
      toast.error("something went wrong")
    }

  }

  const handleDelete = async (e) =>{
    e.preventDefault()
    try {
        let answer = window.prompt(`Are You Sure,
         You want to delete the Product`)
         if(!answer) return
        const {data} = await axios.delete(`http://localhost:8080/product/delete-product/${id}`)
        toast.success('product deleted successfully')
        navigate('/dashboard/admin/products')
    } catch (error) {
        console.log(error)
        toast.error('something went wrong')
    }
  }

  //get single product 
  const getSingleProduct  = async() =>{
    try {
        const {data} = await axios.get(`http://localhost:8080/product/get-product/${params.slug}`)
        setName (data.product.name)
        setId(data.product._id)
        setDescription(data.product.description)
        setAuthor(data.product.author)
        setCategory(data.product.category._id)
        setPrice(data.product.price)
        setQuantity(data.product.quantity)
        setShipping(data.product.shipping)
        setPhoto(data.product.photo)
    } catch (error) {
        console.log(error)
        toast.error('something went wrong')
    }

  }

  useEffect(()=>{
    getSingleProduct()
    //eslint-disable-next-line
},[])


  const getAllCategory = async() => {
    try {
      const {data} = await axios.get('http://localhost:8080/category/categories')
      if(data?.success){
        setCategories(data?.category)
      }
    } catch (error) {
      console.log(error)
      toast.error('something went wrong')
    }
  }

  useEffect(()=>{
    getAllCategory();
  },[])
  

  return (
    <>
        <Layout>
        <div className='flex justify-around items-center'>
        <div>

        <AdminMenu/>
        </div>
        <div className='flex justify-center items-center border w-1/2 h-screen'>
  <div className='text-center  w-full'>
    <h1 className='text-3xl mt-4'>Update Product</h1>
    
    <div className="mt-2 h-10 ">
      <Select
        variant={false}
        placeholder="SELECT A CATEGORY"
        size="large"
        showSearch
        className="w-full px-4 py-2 bg-white border-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-2xl h-full"
        onChange={(value) => {
          setCategory(value);
        }}
        value={category}
      >
        {categories.map((option) => (
          <Option key={option._id} value={option._id}>
            {option.name}
          </Option>
        ))}
      </Select>
    </div>

    <div className="flex justify-center items-center w-full mt-4">
      <label className="w-full max-w-xs flex flex-col items-center px-4 py-2 bg-gray-200 text-blue-500 rounded-md shadow-sm tracking-wide uppercase border border-blue-500 cursor-pointer hover:bg-blue-500 hover:text-white">
        <svg
          className="w-6 h-6 mb-1"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M5.5 4a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v3.586a1 1 0 0 1-.293.707l-3.793 3.793a1 1 0 0 1-1.414 0l-3.793-3.793A1 1 0 0 1 4 8.586V4.5a.5.5 0 0 1 .5-.5z"
          />
          <path
            fillRule="evenodd"
            d="M4 10.914v4.586a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-4.586l-2.793 2.793a1 1 0 0 1-1.414 0L9 12.207l-2.793 2.793a1 1 0 0 1-1.414 0L4 10.914zM6 2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2v2a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"
          />
        </svg>
        
        {photo ? photo.name : "Upload Image"}
        <input
          type="file"
          className="hidden"
          accept='image/*'
          onChange={(e) => setPhoto(e.target.files[0])}
          hidden
        />
      </label>
    </div>

    <div className="flex justify-center mt-4">
      {photo ? (
        <div>
          <img src={URL.createObjectURL(photo)} alt="" className="mt-4" height={'100px'} />
        </div>
      ) : (<div>
        <img src={`http://localhost:8080/product/product-photo/${id}`} alt="" className="mt-4" height={'100px'} />
      </div>)}
    </div>
    <div>
      <input type="text" value={name} placeholder='BOOK NAME' className=' text-xl  w-full text-center mt-4 border-4 h-14  text-black' onChange={(e)=>setName(e.target.value) } />
      <textarea value={description} placeholder='DESCRIPTION' className=' text-xl  w-full p-4 text-center mt-4 border-4 h-14  text-black' onChange={(e)=>setDescription(e.target.value) } />
      <input type="text" value={author} placeholder="AUTHOR'S NAME" className=' text-xl  w-full text-center mt-4 border-4 h-14  text-black' onChange={(e)=>setAuthor(e.target.value) } />
      <input type="number" value={price} placeholder="PRICE" className=' text-xl  w-full text-center mt-4 border-4 h-14  text-black' onChange={(e)=>setPrice(e.target.value) } />
      <input type="number" value={quantity} placeholder="QUANTITY" className=' text-xl  w-full text-center mt-4 border-4 h-14  text-black' onChange={(e)=>setQuantity(e.target.value) } />
      <Select variant={false} placeholder = "SELECT SHIPPING" size='large' showSearch className=' text-xl w-full text-center mt-4 border-4 h-14  text-black' onChange={(value)=>{setShipping(value)}} value={shipping ? 'Yes' : "No"} >
        <Option value='0' className="text-2xl" > No</Option>
        <Option value='1' className="text-2xl" > Yes </Option>
      </Select>
      <button className=' mt-2 border-2 rounded-lg bg-emerald-600 hover:bg-emerald-800 text-white p-4 text-2xl' onClick={handleUpdate} >UPDATE PRODUCT </button>
      <button className=' mt-2 border-2 rounded-lg bg-red-600 hover:bg-red-800 text-white p-4 text-2xl' onClick={handleDelete} >DELETE PRODUCT </button>
    </div>
  </div>
</div>
      </div>
        </Layout>
    </>
  )
}

export default UpdateProduct
import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import AdminMenu from '../../components/AdminMenu'
import toast from 'react-hot-toast'
import axios from 'axios'
import CategoryForm from '../../components/Form/CategoryForm'
import {Modal} from 'antd'




function CreateCategory() {
  const [categories,setCategories] = useState([])
  const [name,setName] = useState('')
  const [visible,setVisible] = useState(false)
  const [selected,setSelected] =useState(null)
  const [updatedName,setUpdatedName] = useState('')
 

  //handle form

  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
      const {data}  =await axios.post('http://localhost:8080/category/create-category',{name})
      if(data.success){
        toast.success(`${name} category is created`)
        getAllCategory()

      }else{
        toast.error(data.message)

      }
    } catch (error) {
      console.log(error)
      toast.error('something went wrong in adding the category')
    }

  }

  const handleUpdate = async(e)=>{
    e.preventDefault();
    try {
     
      const {data}  =await axios.put(`http://localhost:8080/category/update-category/${selected._id}`,{name:updatedName})
      if(data.success){
        toast.success(` the updated category is ${updatedName}`)
        setSelected(null)
        setUpdatedName('')
        setVisible(false)
        getAllCategory()
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error('something went wrong while updating the category')
    }

  }
  //delete category
  const handleDelete = async(id)=>{
    try {
     
      const {data}  =await axios.delete(`http://localhost:8080/category/delete-category/${id}`,{name:updatedName})
      if(data.success){
        toast.success(` category is deleted`)
        getAllCategory()
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error('something went wrong while updating the category')
    }

  }

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
    <div className="flex flex-col md:flex-row justify-center items-center md:items-center">
      <div className="w-1/3 p-4 ">
        <AdminMenu  className= "mx-auto"/>
      </div>
      <div className="flex flex-col justify-center items-center border w-2/3 p-6">
        <div className="text-center w-full">
          <h1 className="text-3xl mt-10">Manage Category</h1>
          <div className="mt-4">
            <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
          </div>

          <div className="mt-4 max-h-screen overflow-y-auto w-full">
            <table className="min-w-full divide-y divide-gray-200 rounded-lg">
              <thead className="bg-gray-300">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-4xl font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-4xl font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {categories?.map((category) => (
                  <tr key={category._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-3xl text-gray-900">{category.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap flex gap-4">
                      <button
                        className="text-white border p-4 rounded-xl shadow-lg bg-indigo-600 hover:bg-indigo-900"
                        onClick={() => {
                          setVisible(true);
                          setUpdatedName(category.name);
                          setSelected(category);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="text-white border p-4 rounded-xl shadow-lg bg-red-600 hover:bg-red-900"
                        onClick={() => {
                          handleDelete(category._id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <Modal onCancel={() => setVisible(false)} footer={null} open={visible}>
          <CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate} />
        </Modal>
      </div>
    </div>
  </Layout>
</>
  )
}

export default CreateCategory
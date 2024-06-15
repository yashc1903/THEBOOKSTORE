import React from 'react'
import Layout from '../../components/Layout'
import AdminMenu from '../../components/AdminMenu'


function CreateProduct() {
  return (
    <>
        <Layout>
        <div className='flex justify-around items-center'>
        <div>

        <AdminMenu/>
        </div>
        <div className='border w-1/2 h-96 '>
          <h1 className='text-3xl w-full mt-10'>Create Product</h1>
         
        </div>
      </div>
        </Layout>
    </>
  )
}

export default CreateProduct
import React from 'react'
import Layout from '../../components/Layout'
import AdminMenu from '../../components/AdminMenu'

function Users() {
  return (

    <>
        <Layout>
        <div className='flex justify-center min-h-screen min-w-full  items-center'>
        <div className=' w-1/3'>

      <AdminMenu/>
        </div>
        <div className=' w-2/3 border min-h-full '>
          <h1 className='text-3xl w-full mt-10 text-center'>All Users</h1>
         
        </div>
      </div>
        </Layout>
    </>
  )
}

export default Users
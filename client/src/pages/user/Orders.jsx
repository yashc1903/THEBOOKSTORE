import React from 'react'
import Layout from '../../components/Layout'
import UserMenu from '../../components/UserMenu'

function Orders() {
  return (
    <>
        <Layout>
        <div className='flex justify-around items-center'>
        <div>

            <UserMenu/>
        </div>
        <div className='border w-1/2 h-96 '>
          <h1 className='text-3xl w-full mt-10'>Orders</h1>
         
        </div>
      </div>
        </Layout>
    </>
  )
}

export default Orders
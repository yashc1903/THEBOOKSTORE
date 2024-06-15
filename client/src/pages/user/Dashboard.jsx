import React from 'react'
import Layout from '../../components/Layout'
import { useAuth } from '../../context/auth'
import UserMenu from '../../components/UserMenu'

function Dashboard() {
  const [auth]= useAuth()
  return (
    <>
        <Layout>
      <div className='flex justify-around items-center'>
        <div>

        <UserMenu/>
        </div>
        <div className='border w-1/2 h-96 '>
          <h1 className='text-3xl w-full mt-10'>USER NAME :   {auth?.user?.name}</h1>
          <h1 className='text-2xl w-full mt-10'>USER EMAIL :   {auth?.user?.email}</h1>
          <h1 className='text-2xl w-full mt-10'>USER CONTACT :   {auth?.user?.phone}</h1>
          <h1 className='text-2xl w-full mt-10'>USER ADDRESS :   {auth?.user?.address}</h1>
        </div>
      </div>
        
    </Layout>
    </>
  )
}

export default Dashboard
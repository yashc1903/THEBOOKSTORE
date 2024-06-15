import React from 'react'
import UserMenu from '../../components/UserMenu'
import Layout from '../../components/Layout'



function Profile() {
  return (
    <>
    <Layout>
    <div className='flex justify-around items-center'>
    <div>

        <UserMenu/>
    </div>
    <div className='border w-1/2 h-96 '>
      <h1 className='text-3xl w-full mt-10'>Profile</h1>
     
    </div>
  </div>
    </Layout>
</>
  )
}

export default Profile
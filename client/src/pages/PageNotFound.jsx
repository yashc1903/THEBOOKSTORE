import React from 'react'
import Layout from '../components/Layout'
import { Link } from 'react-router-dom'

function PageNotFound() {
  return (
    <Layout>
        <div className='flex flex-col justify-center items-center '>
            <h1 className=' text-5xl font-bold text-black'>404</h1>
            <h2 className=' text-4xl'>Oops!! Page Not Found </h2>
            <Link to='/' className='border  p-3 mt-3'>GO BACK</Link>
        </div>
    </Layout>
  )
}

export default PageNotFound
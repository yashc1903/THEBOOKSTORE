import React from 'react'
import Header from './Header'
import Footer from './Footer'

function Layout(props) {
  return (
    <>
    <Header/>
    <main className=' min-h-screen'>
        {props.children}
    </main>
    <Footer/>
    </>
  )
}

export default Layout
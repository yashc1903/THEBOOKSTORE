import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { SearchProvider } from '../context/search'


function Layout(props ,title,description,keywords,author) {
  return (
    <>
    <SearchProvider>
    <Header/>
    <main className=' min-h-screen'>
        {props.children}
    </main>
    <Footer/>
    </SearchProvider>
    </>
  )
}

export default Layout
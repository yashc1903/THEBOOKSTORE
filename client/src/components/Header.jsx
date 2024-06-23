import React, { useState } from 'react'
import { NavLink,Link } from 'react-router-dom'
import { CiShoppingCart } from "react-icons/ci";
import { useAuth } from '../context/auth';
import toast from 'react-hot-toast';
import SearchInput from './Form/SearchInput';
import useCategory from '../hooks/useCategory';
import { useCart } from '../context/cart';
import { Badge } from 'antd';



function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [cart] = useCart()
    const [categoryIsOpen,setCategoryIsOpen]  =useState(false)
    const categories  =useCategory()
    const [auth,setAuth]=useAuth()
    const handleLogout = ()=>{
        setAuth({
            ...auth,
            user:null,
            token:''
        })
        localStorage.removeItem('auth')
        toast.success('Logged Out Successfullt')
    }
  return (
    <>
     <nav className="relative bg-white shadow h-32 dark:bg-gray-800">
      <div className="container px-6 py-4  mx-auto md:flex md:justify-between md:items-center shadow-md">
        <div className="flex items-center  justify-between w-full md:w-auto">
          <Link to='/'>
            <div className='flex justify-center items-center'>
              <img className="h-14 sm:h-7" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8f2qlmQft8PNyJKr6YWqN9X7tz_c3ev5cqQ&s" alt="Logo" />
              <h1 className='my-2 text-gray-700 text-3xl transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0'>THE BOOK STORE</h1>
            </div>
          </Link>
        </div>

        <div className="flex-1 mt-4 md:mt-0">
          <SearchInput />
        </div>

        <div className={`absolute inset-x-0 z-20 w-full px-8 py-4 transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 md:mt-0 md:p-0 md:top-0 md:relative md:bg-transparent md:w-auto md:opacity-100 md:translate-x-0 md:flex md:items-center`}>
          <ul className='flex flex-col md:flex-row md:mx-6'>
            <li className="inline-block text-white text-3xl  transition-colors duration-300 transform dark:text-white hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0">
              <NavLink to='/' exact = "true">Home</NavLink>
            </li>

            <div className="relative inline-block w-full">
      <button
        onClick={() => setCategoryIsOpen(!categoryIsOpen)}
        className="relative w-56 z-10 flex items-center  text-sm text-gray-600 bg-white border border-transparent rounded-md dark:text-white dark:bg-gray-800 dropdown-button"
      >
        <span className="mx-1 text-3xl">Categories</span>
        <svg
          className="w-5 h-5 mx-1"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 15.713L18.01 9.70299L16.597 8.28799L12 12.888L7.40399 8.28799L5.98999 9.70199L12 15.713Z"
            fill="currentColor"
          ></path>
        </svg>
      </button>

      {categoryIsOpen && (
        <div className="fixed  z-20 flex flex-wrap items-center  rounded-mdjustify-center py-2 bg-white dark:bg-gray-800 overflow-y-auto transition ease-out duration-100 transform opacity-100 scale-100">
          <div className="w-full inset-0  max-w-3xl mx-auto p-8 bg-white dark:bg-gray-800 rounded-md shadow-xl">
          <Link
                
                to= {`/categories`}
                className="block px-4 py-3 text-xl text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                All Categories
              </Link>
            {categories.map((c) => (
              <Link
                key={c.name}
                to= {`/category/${c.slug}`}
                className="block px-4 py-3 text-xl text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                {c.name}
              </Link>
            ))}
            
          </div>
        </div>
      )}
    </div>

            
            {!auth.user ? (
              <>
                <li className="my-2 text-gray-700  text-3xl  transition-colors duration-300 transform dark:text-white hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0">
                  <NavLink to='/register'>SignUp</NavLink>
                </li>
                <li className="my-2 text-gray-700 text-3xl transition-colors duration-300 transform dark:text-white hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0">
                  <NavLink to='/login'>Login</NavLink>
                </li>
              </>
            ) : (
              <div className="relative inline-block ">
                <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative w-56 z-10 flex items-center  text-sm text-gray-600 bg-white border border-transparent rounded-md dark:text-white dark:bg-gray-800 dropdown-button"
                >
                    <span className="mx-1 text-3xl"> {auth?.user?.name} </span>
                    <svg
                    className="w-5 h-5 mx-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M12 15.713L18.01 9.70299L16.597 8.28799L12 12.888L7.40399 8.28799L5.98999 9.70199L12 15.713Z"
                            fill="currentColor"
                        ></path>
                    </svg>
                </button>
                {isOpen && (
                  <div
                    className="absolute right-0 z-20 w-48 py-2 mt-2 origin-top-right bg-white rounded-md shadow-xl dark:bg-gray-800"
                    onMouseLeave={() => setIsOpen(false)}
                  >
                    <NavLink
                      to={`/dashboard/${auth?.user?.role === 1 ? 'admin' : 'user'}`}
                      className="block px-4 py-3 text-xl text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      Dashboard
                    </NavLink>
                    <NavLink
                      to="/login"
                      onClick={handleLogout}
                      className="block px-4 py-3 text-xl text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      Logout
                    </NavLink>
                  </div>
                )}
              </div>
            )}
            <Badge count={cart.length} showZero>
                <NavLink to={'/cart'}>

             <CiShoppingCart className='inline-block w-10 h-10 text-white   ' /> 
                </NavLink>

            </Badge>
          </ul>
          
            
          
        </div>
      </div>
    </nav>
    </>
  )
}

export default Header
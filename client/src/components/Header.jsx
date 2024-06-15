import React, { useState } from 'react'
import { NavLink,Link } from 'react-router-dom'
import { CiShoppingCart } from "react-icons/ci";
import { useAuth } from '../context/auth';
import toast from 'react-hot-toast';



function Header() {
    const [isOpen, setIsOpen] = useState(false);
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
    <nav>
    <nav className="relative bg-white shadow dark:bg-gray-800">
            <div className="container px-6 py-4 mx-auto md:flex md:justify-between md:items-center shadow-md">
                <div className="flex items-center justify-between">
                    <Link  to='/'>
                        <div className='flex justify-center items-center'>

                        <img className=" h-14 sm:h-7" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8f2qlmQft8PNyJKr6YWqN9X7tz_c3ev5cqQ&s" alt="Logo" />
                        <h1 className='my-2 text-gray-700 text-3xl transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0"' > THE BOOK STORE</h1>
                        </div>
                    </Link>

                    {/* Mobile menu button */}
                    <div className="flex lg:hidden">
                        <button
                            
                            type="button"
                            className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
                            aria-label="toggle menu"
                        >
                            { (
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
                                </svg>
                            )  }
                        </button>
                    </div>
                </div>

                {/* Mobile Menu open: "block", Menu closed: "hidden" */}
                <div
                    className={`absolute inset-x-0 z-20 w-full px-8 py-4 transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 md:mt-0 md:p-0 md:top-0 md:relative md:bg-transparent md:w-auto md:opacity-100 md:translate-x-0 md:flex md:items-center `}
                >
                    <div className="">
                        <ul className='flex flex-col md:flex-row md:mx-6'>
                            
                        <li className="my-2 text-gray-700 text-3xl transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0" >
                            <NavLink to='/'  >Home</NavLink>
                        </li>
                        <li className="my-2 text-gray-700 text-3xl transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0" >
                            <NavLink to='/category'  >Category</NavLink>
                        </li>
                        {
                                !auth.user ? (
                                    <>
                                        <li className="my-2 text-gray-700 text-3xl transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0">
                                            <NavLink to='/register'>Sign up</NavLink>
                                        </li>
                                        <li className="my-2 text-gray-700 text-3xl transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0">
                                            <NavLink to='/login'>Login</NavLink>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <div className="relative inline-block">
                                            {/* Dropdown toggle button */}
                                            <button
                                                onClick={() => setIsOpen(!isOpen)}
                                                className="relative z-10 block p-2 text-gray-700 bg-white border border-transparent rounded-md dark:text-white focus:border-blue-500 focus:ring-opacity-40 dark:focus:ring-opacity-40 focus:ring-blue-300 dark:focus:ring-blue-400 focus:ring dark:bg-gray-800 focus:outline-none"
                                            >
                                                <h1 className='my-2 text-gray-700 text-2xl transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0'>{auth?.user?.name}</h1>
                                                <svg
                                                className="w-5 h-5 text-gray-800 dark:text-white"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                >
                                                    
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                                </svg>
                                            </button>

                                            {/* Dropdown menu */}
                                                {isOpen && (
                                                <div
                                                className="absolute right-0 z-20 w-48 py-2 mt-2 origin-top-right bg-white rounded-md shadow-xl dark:bg-gray-800"
                                                onMouseLeave={() => setIsOpen(false)}
                                                >
                                                <NavLink
                                                    to={`/dashboard/${auth?.user?.role === 1 ? 'admin' :'user'}`}
                                                    className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                                                >
                                                    Dashboard
                                                </NavLink>
                                                <NavLink
                                                    to="/login"
                                                    onClick={handleLogout}
                                                    className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                                                >
                                                    Logout
                                                </NavLink>
                                                
                                                </div>
                                            )}
                                        </div>
                                    </>
                                )
                            }
                        
                        </ul>
                    </div>

                    <div className="flex justify-center md:block">
                        
                            <CiShoppingCart className='w-10 h-10 text-white' />
                        
                    </div>
                </div>
            </div>
        </nav>
    </nav>
    </>
  )
}

export default Header
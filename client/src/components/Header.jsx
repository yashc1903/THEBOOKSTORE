import React from 'react'
import { NavLink,Link } from 'react-router-dom'
import { CiShoppingCart } from "react-icons/ci";
import { useAuth } from '../context/auth';



function Header() {
    const [auth,setAuth]=useAuth()
    const handleLogout = ()=>{
        setAuth({
            ...auth,
            user:null,
            token:''
        })
        localStorage.removeItem('auth')
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
                                    <li className="my-2 text-gray-700 text-3xl transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0">
                                        <NavLink onClick={handleLogout} to='/login'>Log Out</NavLink>
                                    </li>
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
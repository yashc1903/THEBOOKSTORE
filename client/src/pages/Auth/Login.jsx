import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../../components/Layout'
import axios from 'axios'
import { useNavigate,useLocation } from 'react-router-dom'
import {toast} from 'react-hot-toast'
import { useAuth } from '../../context/auth'


function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const [email,setEmail]= useState('');
    const [password,setPassword]=useState('');
    const [auth,setAuth]= useAuth()

    const handleSubmit = async(e) =>{
        e.preventDefault()
        try {
            const res = await axios.post(`http://localhost:8080/login`,{email,password})
            if(res && res.data.success){
                toast.success(res.data.message)
                setAuth({
                    ...auth,
                    user:res.data.user,
                    token:res.data.token
                })
                localStorage.setItem('auth',JSON.stringify(res.data))
                navigate(location.state || '/')
            }else{
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error('something went wrong')
        }
    }


  return (
    <>
        <Layout>
        <div className="flex min-h-screen justify-center mx-auto items-center">
    <div className=' w-full ' >
        <div className='pt-7 pl-32 w-full '>
            <h1 className='text-5xl text-purple-900 font-semibold '>Login</h1>
            <h1 className='text-3xl text-gray-400 mt-6' > Connect & Collect..!</h1>
        </div>
        <div className=' pt-5 pl-32 w-full'>
            <form className=" w-full max-w-[540px]" onSubmit={handleSubmit} >
                
                <div className="relative mb-6">
                    <input 
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        placeholder="Email"
                        autoComplete='email'
                        className="block w-full  py-5  ps-16 text-lg  border-none rounded-lg  bg-gray-100  focus:bg-white  "
                        type="email"
                    />
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="35.004" height="35.004" rx="2" fill="#4B0082"/>
                        <g clipPath="url(#clip0_1_4670)">
                            <path d="M18.0189 8.03C11.9289 7.6 6.8989 12.63 7.3289 18.72C7.6889 24.01 12.3089 28 17.6089 28H21.2989C21.8489 28 22.2989 27.55 22.2989 27C22.2989 26.45 21.8489 26 21.2989 26H17.6289C13.8989 26 10.4789 23.58 9.5489 19.97C8.0589 14.17 13.4589 8.76 19.2589 10.26C22.8789 11.18 25.2989 14.6 25.2989 18.33V19.43C25.2989 20.22 24.5889 21 23.7989 21C23.0089 21 22.2989 20.22 22.2989 19.43V18.18C22.2989 15.67 20.5189 13.41 18.0389 13.06C14.6389 12.57 11.7689 15.51 12.3789 18.93C12.7189 20.84 14.2089 22.42 16.0989 22.87C17.9389 23.3 19.6889 22.71 20.8389 21.54C21.7289 22.76 23.5089 23.4 25.1389 22.75C26.4789 22.22 27.2989 20.85 27.2989 19.41V18.32C27.2989 13.01 23.3089 8.39 18.0189 8.03ZM17.2989 21C15.6389 21 14.2989 19.66 14.2989 18C14.2989 16.34 15.6389 15 17.2989 15C18.9589 15 20.2989 16.34 20.2989 18C20.2989 19.66 18.9589 21 17.2989 21Z" fill="white"/>
                        </g>
                        <defs>
                            <clipPath id="clip0_1_4670">
                                <rect width="24" height="24" fill="white" transform="translate(5.29883 6)"/>
                            </clipPath>
                        </defs>
                    </svg>
                </div>


                </div>
                
                <div className="relative mb-6">
                    <input 
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        placeholder='Password'
                        autoComplete='current-password'
                        className="block w-full  py-5  ps-16
                        text-lg  border-none rounded-lg  bg-gray-100  focus:bg-white "
                        type="password"
                    />
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="35.004" height="35.004" rx="2" fill="#4B0082"/>
                        <g clipPath="url(#clip0_1_4670)">
                            <path d="M18.0189 8.03C11.9289 7.6 6.8989 12.63 7.3289 18.72C7.6889 24.01 12.3089 28 17.6089 28H21.2989C21.8489 28 22.2989 27.55 22.2989 27C22.2989 26.45 21.8489 26 21.2989 26H17.6289C13.8989 26 10.4789 23.58 9.5489 19.97C8.0589 14.17 13.4589 8.76 19.2589 10.26C22.8789 11.18 25.2989 14.6 25.2989 18.33V19.43C25.2989 20.22 24.5889 21 23.7989 21C23.0089 21 22.2989 20.22 22.2989 19.43V18.18C22.2989 15.67 20.5189 13.41 18.0389 13.06C14.6389 12.57 11.7689 15.51 12.3789 18.93C12.7189 20.84 14.2089 22.42 16.0989 22.87C17.9389 23.3 19.6889 22.71 20.8389 21.54C21.7289 22.76 23.5089 23.4 25.1389 22.75C26.4789 22.22 27.2989 20.85 27.2989 19.41V18.32C27.2989 13.01 23.3089 8.39 18.0189 8.03ZM17.2989 21C15.6389 21 14.2989 19.66 14.2989 18C14.2989 16.34 15.6389 15 17.2989 15C18.9589 15 20.2989 16.34 20.2989 18C20.2989 19.66 18.9589 21 17.2989 21Z" fill="white"/>
                        </g>
                        <defs>
                            <clipPath id="clip0_1_4670">
                                <rect width="24" height="24" fill="white" transform="translate(5.29883 6)"/>
                            </clipPath>
                        </defs>
                    </svg>
                </div>
                </div>
                

                <div className="flex items-center justify-between flex-wrap mt-10">
                    <label className="text-xl text-black cursor-pointer" htmlFor="remember-me">
                    <input className="mr-2 h-6 w-6" id="remember-me" type="checkbox"/>
                    Remember me
                    </label>
                    <Link className="text-xl text-blue-500 hover:underline mb-0.5" to={'/forgot-password'}>Forgot password?</Link>
                </div>
                <div className='w-full' >
                    <button className=' w-full bg-purple-800 h-20  rounded-lg text-white text-3xl mt-10'type='submit' >Login</button>
                </div>
                <div className="flex items-center justify-between mt-4">
                    <span className=" border-b border-gray-600 w-2/4"></span>
                    <p className='mx-2'>OR</p>
                <span className=" border-b dark:border-gray-600 w-2/4"></span>
                </div>
                <div className='w-full' >
                    <button className=' flex items-center h-20 justify-center py-2 px-20 bg-white hover:bg-gray-200 focus:ring-blue-500 focus:ring-offset-blue-200 text-gray-700 w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg'>
                        <svg viewBox="0 0 24 24" height="25" width="25" y="0px" x="0px" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12,5c1.6167603,0,3.1012573,0.5535278,4.2863159,1.4740601l3.637146-3.4699707 C17.8087769,1.1399536,15.0406494,0,12,0C7.392395,0,3.3966675,2.5999146,1.3858032,6.4098511l4.0444336,3.1929321 C6.4099731,6.9193726,8.977478,5,12,5z" fill="#F44336"></path>
                        <path d="M23.8960571,13.5018311C23.9585571,13.0101929,24,12.508667,24,12 c0-0.8578491-0.093689-1.6931763-0.2647705-2.5H12v5h6.4862061c-0.5247192,1.3637695-1.4589844,2.5177612-2.6481934,3.319458 l4.0594482,3.204834C22.0493774,19.135437,23.5219727,16.4903564,23.8960571,13.5018311z" fill="#2196F3"></path>
                        <path d="M5,12c0-0.8434448,0.1568604-1.6483765,0.4302368-2.3972168L1.3858032,6.4098511 C0.5043335,8.0800171,0,9.9801636,0,12c0,1.9972534,0.4950562,3.8763428,1.3582153,5.532959l4.0495605-3.1970215 C5.1484375,13.6044312,5,12.8204346,5,12z" fill="#FFC107"></path>
                        <path d="M12,19c-3.0455322,0-5.6295776-1.9484863-6.5922241-4.6640625L1.3582153,17.532959 C3.3592529,21.3734741,7.369812,24,12,24c3.027771,0,5.7887573-1.1248169,7.8974609-2.975708l-4.0594482-3.204834 C14.7412109,18.5588989,13.4284058,19,12,19z" fill="#00B060"></path>
                        <path opacity=".1" d="M12,23.75c-3.5316772,0-6.7072754-1.4571533-8.9524536-3.7786865C5.2453613,22.4378052,8.4364624,24,12,24 c3.5305786,0,6.6952515-1.5313721,8.8881226-3.9592285C18.6495972,22.324646,15.4981079,23.75,12,23.75z"></path>
                        <polygon opacity=".1" points="12,14.25 12,14.5 18.4862061,14.5 18.587492,14.25"></polygon>
                        <path d="M23.9944458,12.1470337C23.9952393,12.0977783,24,12.0493774,24,12 c0-0.0139771-0.0021973-0.0274658-0.0022583-0.0414429C23.9970703,12.0215454,23.9938965,12.0838013,23.9944458,12.1470337z" fill="#E6E6E6"></path>
                        <path opacity=".2" d="M12,9.5v0.25h11.7855721c-0.0157471-0.0825195-0.0329475-0.1680908-0.0503426-0.25H12z" fill="#FFF"></path>
                        <linearGradient gradientUnits="userSpaceOnUse" y2="12" y1="12" x2="24" x1="0" id="LxT-gk5MfRc1Gl_4XsNKba_xoyhGXWmHnqX_gr1" >
                            <stop stopOpacity=".2" stopColor="#fff" offset="0"></stop>
                            <stop stopOpacity="0" stopColor="#fff" offset="1"></stop>
                        </linearGradient>
                        <path d="M23.7352295,9.5H12v5h6.4862061C17.4775391,17.121582,14.9771729,19,12,19 c-3.8659668,0-7-3.1340332-7-7c0-3.8660278,3.1340332-7,7-7c1.4018555,0,2.6939087,0.4306641,3.7885132,1.140686 c0.1675415,0.1088867,0.3403931,0.2111206,0.4978027,0.333374l3.637146-3.4699707L19.8414307,2.940979 C17.7369385,1.1170654,15.00354,0,12,0C5.3725586,0,0,5.3725586,0,12c0,6.6273804,5.3725586,12,12,12 c6.1176758,0,11.1554565-4.5812378,11.8960571-10.4981689C23.9585571,13.0101929,24,12.508667,24,12 C24,11.1421509,23.906311,10.3068237,23.7352295,9.5z" fill="url(#LxT-gk5MfRc1Gl_4XsNKba_xoyhGXWmHnqX_gr1)"></path>
                        <path opacity=".1" d="M15.7885132,5.890686C14.6939087,5.1806641,13.4018555,4.75,12,4.75c-3.8659668,0-7,3.1339722-7,7 c0,0.0421753,0.0005674,0.0751343,0.0012999,0.1171875C5.0687437,8.0595093,8.1762085,5,12,5 c1.4018555,0,2.6939087,0.4306641,3.7885132,1.140686c0.1675415,0.1088867,0.3403931,0.2111206,0.4978027,0.333374 l3.637146-3.4699707l-3.637146,3.2199707C16.1289062,6.1018066,15.9560547,5.9995728,15.7885132,5.890686z"></path>
                        <path opacity=".2" d="M12,0.25c2.9750366,0,5.6829224,1.0983887,7.7792969,2.8916016l0.144165-0.1375122 l-0.110014-0.0958166C17.7089558,1.0843592,15.00354,0,12,0C5.3725586,0,0,5.3725586,0,12 c0,0.0421753,0.0058594,0.0828857,0.0062866,0.125C0.0740356,5.5558472,5.4147339,0.25,12,0.25z" fill="#FFF"></path>
                        </svg>
                        <span className="ml-2 text-2xl text-gray-500">Login with Google</span>
                    </button>
                </div>
                <div className="flex justify-center text-2xl  mx-auto">
                    <p className="text-black text-center  mt-4"> Are you new user?  <Link className=" text-blue-500 -200 hover:underline mt-4 text-2xl" to={'/register'} >Sign Up</Link></p>
                </div>
            </form>
        </div>
    </div>
    
</div>
        </Layout>
    </>
  )
}

export default Login

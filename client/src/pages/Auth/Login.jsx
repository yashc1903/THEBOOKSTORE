import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "../../context/auth";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:8080/login`, {
        email,
        password,
      });
      if (res && res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  return (
    <>
      <Layout>
       
          <div className=" min-w-full flex flex-col justify-center items-center ">
          <div className="w-1/3 mt-10 rounded-xl bg-gradient-to-tr from-rose-100 to-teal-100 px-10">
            <div className="text-center w-full  mt-10 ">
              <h1 className="text-5xl text-purple-900 font-semibold ">
                Login
              </h1>
              <h1 className="text-3xl text-gray-400 mt-6">
                {" "}
                Connect & Collect..!
              </h1>
            </div>
            <div className=" w-full">
              <form className=" w-full max-w-[540px] mx-auto" onSubmit={handleSubmit}>
                <div className="relative mb-6">
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    autoComplete="email"
                    className="block w-full  py-5  ps-16 text-lg  border-none rounded-lg  bg-gray-100  focus:bg-white  "
                    type="email"
                  />
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                      width="35"
                      height="35"
                      viewBox="0 0 35 35"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        width="35.004"
                        height="35.004"
                        rx="2"
                        fill="#4B0082"
                      />
                      <g clipPath="url(#clip0_1_4670)">
                        <path
                          d="M18.0189 8.03C11.9289 7.6 6.8989 12.63 7.3289 18.72C7.6889 24.01 12.3089 28 17.6089 28H21.2989C21.8489 28 22.2989 27.55 22.2989 27C22.2989 26.45 21.8489 26 21.2989 26H17.6289C13.8989 26 10.4789 23.58 9.5489 19.97C8.0589 14.17 13.4589 8.76 19.2589 10.26C22.8789 11.18 25.2989 14.6 25.2989 18.33V19.43C25.2989 20.22 24.5889 21 23.7989 21C23.0089 21 22.2989 20.22 22.2989 19.43V18.18C22.2989 15.67 20.5189 13.41 18.0389 13.06C14.6389 12.57 11.7689 15.51 12.3789 18.93C12.7189 20.84 14.2089 22.42 16.0989 22.87C17.9389 23.3 19.6889 22.71 20.8389 21.54C21.7289 22.76 23.5089 23.4 25.1389 22.75C26.4789 22.22 27.2989 20.85 27.2989 19.41V18.32C27.2989 13.01 23.3089 8.39 18.0189 8.03ZM17.2989 21C15.6389 21 14.2989 19.66 14.2989 18C14.2989 16.34 15.6389 15 17.2989 15C18.9589 15 20.2989 16.34 20.2989 18C20.2989 19.66 18.9589 21 17.2989 21Z"
                          fill="white"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1_4670">
                          <rect
                            width="24"
                            height="24"
                            fill="white"
                            transform="translate(5.29883 6)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                </div>

                <div className="relative mb-6">
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    autoComplete="current-password"
                    className="block w-full  py-5  ps-16
                        text-lg  border-none rounded-lg  bg-gray-100  focus:bg-white "
                    type="password"
                  />
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                      width="35"
                      height="35"
                      viewBox="0 0 35 35"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        width="35.004"
                        height="35.004"
                        rx="2"
                        fill="#4B0082"
                      />
                      <g clipPath="url(#clip0_1_4670)">
                        <path
                          d="M18.0189 8.03C11.9289 7.6 6.8989 12.63 7.3289 18.72C7.6889 24.01 12.3089 28 17.6089 28H21.2989C21.8489 28 22.2989 27.55 22.2989 27C22.2989 26.45 21.8489 26 21.2989 26H17.6289C13.8989 26 10.4789 23.58 9.5489 19.97C8.0589 14.17 13.4589 8.76 19.2589 10.26C22.8789 11.18 25.2989 14.6 25.2989 18.33V19.43C25.2989 20.22 24.5889 21 23.7989 21C23.0089 21 22.2989 20.22 22.2989 19.43V18.18C22.2989 15.67 20.5189 13.41 18.0389 13.06C14.6389 12.57 11.7689 15.51 12.3789 18.93C12.7189 20.84 14.2089 22.42 16.0989 22.87C17.9389 23.3 19.6889 22.71 20.8389 21.54C21.7289 22.76 23.5089 23.4 25.1389 22.75C26.4789 22.22 27.2989 20.85 27.2989 19.41V18.32C27.2989 13.01 23.3089 8.39 18.0189 8.03ZM17.2989 21C15.6389 21 14.2989 19.66 14.2989 18C14.2989 16.34 15.6389 15 17.2989 15C18.9589 15 20.2989 16.34 20.2989 18C20.2989 19.66 18.9589 21 17.2989 21Z"
                          fill="white"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1_4670">
                          <rect
                            width="24"
                            height="24"
                            fill="white"
                            transform="translate(5.29883 6)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                </div>

                <div className="flex items-center justify-between flex-wrap mt-10">
                  <label
                    className="text-xl text-black cursor-pointer"
                    htmlFor="remember-me"
                  >
                    <input
                      className="mr-2 h-6 w-6"
                      id="remember-me"
                      type="checkbox"
                    />
                    Remember me
                  </label>
                  <Link
                    className="text-xl text-blue-500 hover:underline mb-0.5"
                    to={"/forgot-password"}
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="w-full">
                  <button
                    className=" w-full bg-purple-800 h-20  rounded-lg text-white text-3xl mt-10"
                    type="submit"
                  >
                    {" "}
                    Login{" "}
                  </button>
                </div>
                
                
                <div className="flex justify-center text-2xl  mx-auto">
                  <p className="text-black text-center  mt-4">
                    {" "}
                    Are you new user?{" "}
                    <Link
                      className=" text-blue-500 -200 hover:underline mt-4 text-2xl"
                      to={"/register"}
                    >
                      Sign up
                    </Link>
                  </p>
                </div>
              </form>
            </div>
            </div>
          </div>
       
      </Layout>
    </>
  );
}

export default Login;

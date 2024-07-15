import React, { useState } from "react";
import Layout from "../../components/Layout";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [answer, setAnswer] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:8080/forgot-password`, {
        email,
        newPassword,
        answer,
      });
      if (res && res.data.success) {
        toast.success(res.data.message);
        navigate(location.state || "/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <div className=" min-w-full flex flex-col justify-center items-center ">
        <div className="w-full max-w-lg rounded-xl bg-gradient-to-tr from-rose-100 to-teal-100 mt-10">
          <div className=" text-center mt-10">
            <h1 className="text-5xl text-purple-900 font-semibold">Reset Password</h1>
            <h1 className="text-3xl text-gray-400 mt-6">Connect & Collect..!</h1>
          </div>
          <div className="mt-6  w-full">
            <form className=" max-w-[540px] mx-auto p-8" onSubmit={handleSubmit}>
              <div className="mb-6">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  autoComplete="email"
                  className="block w-full py-3 px-4 text-lg border-none rounded-lg bg-gray-100 focus:bg-white"
                  type="email"
                />
              </div>

              <div className="mb-6">
                <input
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="What is your favourite Sport?"
                  autoComplete="current-password"
                  className="block w-full py-3 px-4 text-lg border-none rounded-lg bg-gray-100 focus:bg-white"
                  type="password"
                />
              </div>

              <div className="mb-6">
                <input
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="New Password"
                  autoComplete="current-password"
                  className="block w-full py-3 px-4 text-lg border-none rounded-lg bg-gray-100 focus:bg-white"
                  type="password"
                />
              </div>

              <div className="mb-6">
                <button
                  className="w-full bg-purple-800 h-16 rounded-lg text-white text-2xl"
                  type="submit"
                >
                  Reset Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ForgotPassword;

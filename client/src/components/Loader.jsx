import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Loader({ path = "login" }) {
  const navigate = useNavigate();
  const [count, setCount] = useState(3);
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => {
        if (prevValue === 1) {
          clearInterval(interval);
          navigate(`/${path}`, {
            state: location.pathname,
          });
        }
        return prevValue - 1;
      });
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [navigate, location, path]);

  return (
    <>
      <div className="min-h-screen flex flex-col justify-center items-center">
        <div className="flex gap-x-2 justify-center items-center">
          <div className="w-5 bg-[#d991c2] animate-pulse h-5 rounded-full animate-bounce"></div>
          <div className="w-5 animate-pulse h-5 bg-[#9869b8] rounded-full animate-bounce"></div>
          <div className="w-5 h-5 animate-pulse bg-[#6756cc] rounded-full animate-bounce"></div>
        </div>
        <h1 className="mt-4 text-center text-3xl">
          Redirecting you in {count}
        </h1>
      </div>
    </>
  );
}

export default Loader;

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
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 dark:bg-gray-800">
        <div className="flex gap-2 justify-center items-center mb-4">
          <div className="w-3 h-3 bg-[#d991c2] animate-pulse rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-[#9869b8] animate-pulse rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-[#6756cc] animate-pulse rounded-full animate-bounce"></div>
        </div>
        <h1 className="text-center text-2xl sm:text-3xl lg:text-4xl">
          Redirecting you in {count}
        </h1>
      </div>
    </>
  );
}

export default Loader;

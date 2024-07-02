import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import useCategory from "../hooks/useCategory";
import { Link } from "react-router-dom";

function Categories() {
  const categories = useCategory();

  return (
    <>
      <Layout>
        <div className="p-4  shadow-md">
          <div className="text-4xl font-semibold bg-gradient-to-l bg-clip-text  from-fuchsia-500 to-cyan-500 text-transparent  text-center  mb-10">
            All categories
          </div>
          <div className="grid grid-cols-4 gap-4   items-center justify-center">
            {categories.map((c) => (
              <div key={c._id} className="group">
                <button className="w-full h-10 text-center px-4 py-2  bg-gradient-to-tr from-rose-100 to-teal-100 text-2xl text-black  font-semibold bg-opacity-95  rounded-md shadow-sm transition duration-300 ease-in-out transform hover:bg-gray-500 hover:text-white ">
                  <Link
                    to={`/category/${c.slug}`}
                    className="block w-full h-full"
                  >
                    {c.name}
                  </Link>
                </button>
              </div>
            ))}
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Categories;

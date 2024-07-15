import React from "react";
import Layout from "../components/Layout";
import useCategory from "../hooks/useCategory";
import { Link } from "react-router-dom";

function Categories() {
  const categories = useCategory();

  return (
    <Layout>
      <div className="p-4 shadow-md">
        <div className="text-center text-4xl mx-auto font-semibold text-black bg-white rounded-full bg-opacity-60 w-full md:w-1/3 mb-10">
          All categories
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center justify-center">
          {categories.map((c) => (
            <div key={c._id} className="group">
              <button className="w-full h-20 text-center px-4 py-2 bg-gradient-to-tr from-rose-100 to-teal-100 text-2xl text-black font-semibold bg-opacity-95 rounded-md shadow-sm transition duration-300 ease-in-out transform hover:bg-gray-500 hover:text-purple-500">
                <Link to={`/category/${c.slug}`} className="block w-full ">
                  {c.name}
                </Link>
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default Categories;

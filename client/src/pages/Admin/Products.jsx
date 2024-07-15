import Layout from "../../components/Layout";
import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/AdminMenu";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  // Fetch all products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:8080/product/product-list/${page}`
      );
      setLoading(false);
      setProducts((prevProducts) => [...prevProducts, ...data.products]);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // Fetch total number of products
  const getTotalProducts = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/product/product-count`
      );
      setTotal(data.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts();
    getTotalProducts();
  }, [page]); // Reload products when page changes

  return (
    <Layout>
      <div className="flex flex-col md:flex-row  min-w-full min-h-screen">
        {/* AdminMenu Section */}
        <div className="w-full md:w-1/4 p-4 ">
          <AdminMenu style={{ position: "sticky", top: "160px", width: "100%" }} />
        </div>
        {/* Products Section */}
        <div className="w-full md:w-3/4 p-4">
          <div className="text-center">
            <h1 className="text-4xl font-semibold text-black bg-white rounded-full bg-opacity-60 w-96 mx-auto mb-4">ALL PRODUCTS LIST</h1>
            <div className="grid md:grid-cols-3 gap-4 md:gap-6 overflow-y-auto h-[calc(100vh-150px)]">
              {products.map((product) => (
                <Link
                  to={`/dashboard/admin/product/${product.slug}`}
                  key={product._id}
                  className="hover:text-indigo-500"
                >
                  <div className="bg-white rounded-lg border-2 bg-gradient-to-tr from-rose-100 to-teal-100 shadow-md p-4 h-full">
                    <img
                      src={`http://localhost:8080/product/product-photo/${product._id}`}
                      alt="Product Image"
                      className="w-full h-48 object-contain rounded-lg"
                    />
                    <div className="mt-2">
                      <h2 className="text-lg font-bold text-gray-800">{product.name}</h2>
                      <p className="text-gray-600 text-sm mt-2 line-clamp-3">{product.description}</p>
                      <p className="text-gray-600 text-sm font-semibold mt-2">{product.author} (Author)</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            {/* Load More Button */}
            <div className="flex justify-center mt-4">
              {products.length < total && (
                <button
                  className="p-4 bg-indigo-500 text-white rounded-full border-2 border-white w-56 font-bold"
                  onClick={() => setPage(page + 1)}
                >
                  {loading ? "Loading..." : "Load More"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Products;

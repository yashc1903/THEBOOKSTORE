import Layout from "../../components/Layout";
import React from "react";
import AdminMenu from "../../components/AdminMenu";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:8080/product/product-list/${page}`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/product/product-count`
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts();
    getTotal();
  }, []);

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:8080/product/product-list/${page}`
      );
      setLoading(false);
      setProducts((prevProducts) => [...prevProducts, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  return (
    <Layout>
      <div className="flex flex-col lg:flex-row justify-center min-h-screen items-start lg:items-stretch">
        <div className="w-full lg:w-1/4 p-4 lg:p-6">
          <AdminMenu />
        </div>
        <div className="w-full lg:w-3/4 p-4 lg:p-6 border rounded-md shadow-lg">
          <div className="text-center">
            <h1 className="text-3xl mt-4 mb-6 lg:mt-4">ALL PRODUCTS LIST</h1>
            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto h-[calc(100vh-200px)]">
              {products?.map((product) => (
                <Link
                  to={`/dashboard/admin/product/${product.slug}`}
                  key={product._id}
                >
                  <div className="bg-white rounded-lg shadow-md p-4 h-96 flex flex-col">
                    <img
                      src={`http://localhost:8080/product/product-photo/${product._id}`}
                      alt="Product Image"
                      className="w-full h-48 object-contain rounded-lg"
                    />
                    <div className="mt-2 flex-1">
                      <h2 className="text-lg font-bold text-gray-800">
                        {product.name}
                      </h2>
                      <p className="text-gray-600 text-sm mt-2 line-clamp-3">
                        {product.description}
                      </p>
                      <p className="text-gray-600 text-sm font-semibold mt-2">
                        {product.author} (Author)
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="w-full flex justify-center mt-4">
            {products && products.length < total && (
              <button
                className="p-4 bg-gray-500 rounded-full border-2 border-black w-56 text-white text-2xl font-bold"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading...." : "Load More"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Products;

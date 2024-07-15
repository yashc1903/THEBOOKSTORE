import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import AdminMenu from "../../components/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";

const { Option } = Select;

function UpdateProduct() {
  const [categories, setCategories] = useState([]);
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [isRentable, setIsRentable] = useState("");
  const [rentPrice, setRentPrice] = useState("");
  const [id, setId] = useState("");
  const navigate = useNavigate();
  const params = useParams();

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("author", author);
      productData.append("price", price);
      productData.append("category", category);
      photo && productData.append("photo", photo);
      productData.append("quantity", quantity);
      productData.append("shipping", shipping);
      productData.append("isRentable", isRentable);
      productData.append("rentPrice", rentPrice);
      
      const { data } = await axios.put(
        `http://localhost:8080/product/update-product/${id}`,
        productData
      );
      
      if (data?.success) {
        toast.success(data?.message);
      } else {
        toast.success("Product updated successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      let answer = window.confirm("Are you sure you want to delete the product?");
      if (!answer) return;
      
      const { data } = await axios.delete(
        `http://localhost:8080/product/delete-product/${id}`
      );
      
      toast.success("Product deleted successfully");
      navigate("/dashboard/admin/products");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // Fetch single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/product/get-product/${params.slug}`
      );
      
      setName(data.product.name);
      setId(data.product._id);
      setDescription(data.product.description);
      setAuthor(data.product.author);
      setCategory(data.product.category._id);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
      setPhoto(data.product.photo);
      setIsRentable(data.product.isRentable.toString()); // Ensure string value
      setRentPrice(data.product.rentPrice);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // Fetch all categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/category/categories"
      );
      
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, []); // Fetch product on initial load

  useEffect(() => {
    getAllCategories();
  }, []); // Fetch categories on initial load

  return (
    <Layout>
      <div className="flex  min-h-screen flex-col md:flex-row">
        {/* AdminMenu Section */}
        <div className="w-full md:w-1/4 p-4 ">
          <AdminMenu style={{ position: "sticky", top: "160px", width: "100%" }} />
        </div>
        {/* Update Product Form Section */}
        <div className="w-full md:w-3/4 p-4">
          <div className="text-center w-full">
            <h1 className="text-3xl mt-4 mb-8">Update Product</h1>
            <div className=" min-w-full max-w-lg mx-auto bg-gradient-to-tr from-rose-100 to-teal-100 p-6 rounded-xl">
              <Select
                placeholder="Select a Category"
                size="large"
                showSearch
                className="w-full mb-4"
                onChange={(value) => {
                  setCategory(value);
                }}
                value={category}
              >
                {categories.map((option) => (
                  <Option key={option._id} value={option._id}>
                    {option.name}
                  </Option>
                ))}
              </Select>
              
              <label
                className="w-full max-w-xs flex flex-col mx-auto items-center px-4 py-2 bg-gray-200 text-blue-500 rounded-md shadow-sm tracking-wide uppercase border border-blue-500 cursor-pointer hover:bg-blue-500 hover:text-white mb-4"
              >
                <svg
                  className="w-6 h-6 mb-1"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.5 4a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v3.586a1 1 0 0 1-.293.707l-3.793 3.793a1 1 0 0 1-1.414 0l-3.793-3.793A1 1 0 0 1 4 8.586V4.5a.5.5 0 0 1 .5-.5z"
                  />
                  <path
                    fillRule="evenodd"
                    d="M4 10.914v4.586a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-4.586l-2.793 2.793a1 1 0 0 1-1.414 0L9 12.207l-2.793 2.793a1 1 0 0 1-1.414 0L4 10.914zM6 2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2v2a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"
                  />
                </svg>
                {photo ? photo.name : "Upload Image"}
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                />
              </label>
              
              <div className="flex justify-center items-center w-full">
                {photo && (
                  <img
                    src={URL.createObjectURL(photo)}
                    alt=""
                    className="mt-2 h-24"
                  />
                )}
                {!photo && (
                  <img
                    src={`http://localhost:8080/product/product-photo/${id}`}
                    alt=""
                    className="mt-2 h-24"
                  />
                )}
              </div>
              
              <input
                type="text"
                value={name}
                placeholder="Book Name"
                className="w-full mb-4 p-4 border rounded-md"
                onChange={(e) => setName(e.target.value)}
              />
              <textarea
                value={description}
                placeholder="Description"
                className="w-full mb-4 p-4 border rounded-md"
                onChange={(e) => setDescription(e.target.value)}
              />
              <input
                type="text"
                value={author}
                placeholder="Author's Name"
                className="w-full mb-4 p-4 border rounded-md"
                onChange={(e) => setAuthor(e.target.value)}
              />
              <input
                type="number"
                value={price}
                placeholder="Price"
                className="w-full mb-4 p-4 border rounded-md"
                onChange={(e) => setPrice(e.target.value)}
              />
              <input
                type="number"
                value={rentPrice}
                placeholder="Rent Price"
                className="w-full mb-4 p-4 border rounded-md"
                onChange={(e) => setRentPrice(e.target.value)}
              />
              <input
                type="number"
                value={quantity}
                placeholder="Quantity"
                className="w-full mb-4 p-4 border rounded-md"
                onChange={(e) => setQuantity(e.target.value)}
              />
              <Select
                placeholder="Select Shipping"
                size="large"
                showSearch
                className="w-full mb-4"
                onChange={(value) => {
                  setShipping(value);
                }}
                value={shipping ? "Yes" : "No"}
              >
                <Option value="0">No</Option>
                <Option value="1">Yes</Option>
              </Select>
              <Select
                placeholder="Available for Rent"
                size="large"
                showSearch
                className="w-full mb-4"
                onChange={(value) => {
                  setIsRentable(value);
                }}
                value={isRentable}
              >
                <Option value="0">No</Option>
                <Option value="1">Yes</Option>
              </Select>
              <div className="flex justify-center">
                <button
                  className="w-full md:w-auto mt-4 mr-2 p-4 bg-emerald-600 hover:bg-emerald-800 text-white rounded-lg text-2xl"
                  onClick={handleUpdate}
                >
                  Update Product
                </button>
                <button
                  className="w-full md:w-auto mt-4 p-4 bg-red-600 hover:bg-red-800 text-white rounded-lg text-2xl"
                  onClick={handleDelete}
                >
                  Delete Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default UpdateProduct;

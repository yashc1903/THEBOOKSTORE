import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import AdminMenu from "../../components/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

function CreateProduct() {
  const [categories, setCategories] = useState([]);
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("author", author);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("photo", photo);
      productData.append("quantity", quantity);
      productData.append("shipping", shipping);
      const { data } = await axios.post(
        "http://localhost:8080/product/create-product",
        productData
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product created Successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const getAllCategory = async () => {
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
    getAllCategory();
  }, []);

  return (
    <Layout>
      <div className="flex flex-col lg:flex-row justify-center lg:justify-around items-start w-full p-6 space-y-6 lg:space-y-0 lg:space-x-6 min-h-screen">
        <div className="w-full lg:w-1/4">
          <AdminMenu />
        </div>
        <div className="w-full lg:w-3/4 border p-6 rounded-md shadow-lg">
          <h1 className="text-3xl text-center mb-6">Create Product</h1>
          <form onSubmit={handleCreate} className="space-y-4">
            <Select
              placeholder="SELECT A CATEGORY"
              size="large"
              showSearch
              className="w-full"
              onChange={(value) => setCategory(value)}
            >
              {categories.map((option) => (
                <Option key={option._id} value={option._id}>
                  {option.name}
                </Option>
              ))}
            </Select>
            <label className="w-full flex flex-col items-center px-4 py-2 bg-gray-200 text-blue-500 rounded-md shadow-sm cursor-pointer hover:bg-blue-500 hover:text-white">
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
            {photo && (
              <div className="flex justify-center mt-4">
                <img
                  src={URL.createObjectURL(photo)}
                  alt="Product"
                  className="max-w-xs"
                />
              </div>
            )}
            <input
              type="text"
              value={name}
              placeholder="BOOK NAME"
              className="text-xl w-full p-2 border rounded-md"
              onChange={(e) => setName(e.target.value)}
            />
            <textarea
              value={description}
              placeholder="DESCRIPTION"
              className="text-xl w-full p-2 border rounded-md"
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              type="text"
              value={author}
              placeholder="AUTHOR'S NAME"
              className="text-xl w-full p-2 border rounded-md"
              onChange={(e) => setAuthor(e.target.value)}
            />
            <input
              type="number"
              value={price}
              placeholder="PRICE"
              className="text-xl w-full p-2 border rounded-md"
              onChange={(e) => setPrice(e.target.value)}
            />
            <input
              type="number"
              value={quantity}
              placeholder="QUANTITY"
              className="text-xl w-full p-2 border rounded-md"
              onChange={(e) => setQuantity(e.target.value)}
            />
            <Select
              placeholder="SELECT SHIPPING"
              size="large"
              className="w-full"
              onChange={(value) => setShipping(value)}
            >
              <Option value="0">No</Option>
              <Option value="1">Yes</Option>
            </Select>
            <button
              type="submit"
              className="w-full bg-emerald-600 text-white p-4 rounded-md shadow-sm hover:bg-emerald-700 text-xl"
            >
              CREATE PRODUCT
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default CreateProduct;

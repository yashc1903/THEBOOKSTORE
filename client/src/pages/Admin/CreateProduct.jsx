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
  const [isRentable, setIsRentable] = useState("");
  const [rentPrice, setRentPrice] = useState("");
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
      productData.append("isRentable", isRentable);
      productData.append("rentPrice", rentPrice);
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
      <div className="flex flex-col md:flex-row ">
        {/* AdminMenu Section */}
        <div className="w-full md:w-1/4 p-4">
          <AdminMenu style={{ position: "sticky", top: "160px", width: "100%" }} />
        </div>
        {/* Content Section */}
        <div className="w-full md:w-3/4 p-6">
          <div className="text-center">
            <h1 className="text-4xl font-semibold text-black bg-white rounded-full bg-opacity-60 w-96 mx-auto mb-4">Create Product</h1>
            <div className="bg-gradient-to-tr from-rose-100 to-teal-100 p-6 rounded-xl">
              {/* Category Select */}
              <div className="mt-4">
                <Select
                  placeholder="SELECT A CATEGORY"
                  size="large"
                  showSearch
                  className="w-full"
                  onChange={(value) => {
                    setCategory(value);
                  }}
                >
                  {categories.map((option) => (
                    <Option key={option._id} value={option._id}>
                      {option.name}
                    </Option>
                  ))}
                </Select>
              </div>

              {/* Upload Image */}
              <div className="flex justify-center items-center mt-4">
                <label className="w-full max-w-xs flex flex-col items-center px-4 py-2 bg-gray-200 text-blue-500 rounded-md shadow-sm tracking-wide uppercase border border-blue-500 cursor-pointer hover:bg-blue-500 hover:text-white">
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
                    hidden
                  />
                </label>
              </div>

              {/* Display Uploaded Image */}
              {photo && (
                <div className="flex justify-center mt-4">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt=""
                    className="h-96"
                  />
                </div>
              )}

              {/* Form Inputs */}
              <div className="mt-4 space-y-4">
                <input
                  type="text"
                  value={name}
                  placeholder="BOOK NAME"
                  className="w-full p-2 border-2 rounded-md text-xl text-center"
                  onChange={(e) => setName(e.target.value)}
                />
                <textarea
                  value={description}
                  placeholder="DESCRIPTION"
                  className="w-full p-2 border-2 rounded-md text-xl text-center"
                  onChange={(e) => setDescription(e.target.value)}
                />
                <input
                  type="text"
                  value={author}
                  placeholder="AUTHOR'S NAME"
                  className="w-full p-2 border-2 rounded-md text-xl text-center"
                  onChange={(e) => setAuthor(e.target.value)}
                />
                <input
                  type="number"
                  value={price}
                  placeholder="PRICE"
                  className="w-full p-2 border-2 rounded-md text-xl text-center"
                  onChange={(e) => setPrice(e.target.value)}
                />
                <input
                  type="number"
                  value={rentPrice}
                  placeholder="RENT PRICE PER DAY"
                  className="w-full p-2 border-2 rounded-md text-xl text-center"
                  onChange={(e) => setRentPrice(e.target.value)}
                />
                <input
                  type="number"
                  value={quantity}
                  placeholder="QUANTITY"
                  className="w-full p-2 border-2 rounded-md text-xl text-center"
                  onChange={(e) => setQuantity(e.target.value)}
                />

                {/* Select Shipping and Rentable */}
                <Select
                  placeholder="SELECT SHIPPING"
                  size="large"
                  showSearch
                  className="w-full"
                  onChange={(value) => {
                    setShipping(value);
                  }}
                >
                  <Option value="0" className="text-2xl">
                    No
                  </Option>
                  <Option value="1" className="text-2xl">
                    Yes
                  </Option>
                </Select>
                <Select
                  placeholder="AVAILABLE FOR RENT"
                  size="large"
                  showSearch
                  className="w-full"
                  onChange={(value) => {
                    setIsRentable(value);
                  }}
                >
                  <Option value="0" className="text-2xl">
                    No
                  </Option>
                  <Option value="1" className="text-2xl">
                    Yes
                  </Option>
                </Select>

                {/* Submit Button */}
                <button
                  className="mt-4 w-full p-4 text-2xl bg-emerald-600 text-white rounded-lg"
                  onClick={handleCreate}
                >
                  CREATE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CreateProduct;

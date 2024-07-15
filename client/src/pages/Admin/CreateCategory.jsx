import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import AdminMenu from "../../components/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";
import { Modal } from "antd";

function CreateCategory() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:8080/category/create-category",
        { name }
      );
      if (data.success) {
        toast.success(`${name} category is created`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in adding the category");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `http://localhost:8080/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data.success) {
        toast.success(`The updated category is ${updatedName}`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while updating the category");
    }
  };

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:8080/category/delete-category/${id}`
      );
      if (data.success) {
        toast.success(`Category is deleted`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while deleting the category");
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
      <div className="flex flex-col md:flex-row  ">
        {/* AdminMenu Section */}
        <div className="w-full md:w-1/4 p-4 lg:p-6">
          <AdminMenu style={{ position: "sticky", top: "160px", width: "100%" }} />
        </div>
        {/* Content Section */}
        <div className="w-full md:w-3/4 p-6">
          <div className="text-center w-full">
            <h1 className="text-center text-4xl mx-auto font-semibold text-black bg-white rounded-full bg-opacity-60 w-full md:w-96 mb-4">
              Manage Category
            </h1>
            {/* CategoryForm Component */}
            <div className="mt-4">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            {/* Table Section */}
            <div className="mt-4 mb-10 max-h-screen w-full md:w-2/3 mx-auto overflow-y-auto rounded-xl">
              <table className="min-w-full divide-y divide-gray-200 rounded-xl">
                <thead className="bg-gray-300">
                  <tr>
                    <th className="px-6 py-3 text-left text-2xl md:text-4xl font-medium text-black uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-2xl md:text-4xl font-medium text-black uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {categories?.map((category) => (
                    <tr key={category._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-xl md:text-3xl text-left text-gray-900">
                          {category.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap flex gap-4">
                        <button
                          className="text-white border p-2 md:p-4 rounded-lg shadow-lg bg-indigo-600 hover:bg-indigo-900"
                          onClick={() => {
                            setVisible(true);
                            setUpdatedName(category.name);
                            setSelected(category);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="text-white border p-2 md:p-4 rounded-lg shadow-lg bg-red-600 hover:bg-red-900"
                          onClick={() => {
                            handleDelete(category._id);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* Modal for Edit Category */}
          <Modal onCancel={() => setVisible(false)} footer={null} visible={visible}>
            <CategoryForm
              value={updatedName}
              setValue={setUpdatedName}
              handleSubmit={handleUpdate}
            />
          </Modal>
        </div>
      </div>
    </Layout>
  );
}

export default CreateCategory;

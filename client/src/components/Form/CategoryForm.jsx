import React from "react";

function CategoryForm({ handleSubmit, value, setValue }) {
  return (
    <>
      <div className="flex flex-col items-center justify-center  dark">
        <div className="w-full max-w-md bg-gray-300 rounded-lg shadow-md p-6">
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <input
              placeholder="ENTER NEW CATEGORY"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              type="text"
            />

            <button
              className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
              type="submit"
            >
              ADD
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default CategoryForm;

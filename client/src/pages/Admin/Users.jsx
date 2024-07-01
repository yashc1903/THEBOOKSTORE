import React from "react";
import Layout from "../../components/Layout";
import AdminMenu from "../../components/AdminMenu";

function Users() {
  return (
    <Layout>
      <div className="flex flex-col lg:flex-row justify-center min-h-screen items-start lg:items-stretch">
        <div className="w-full lg:w-1/4 p-4 lg:p-6">
          <AdminMenu />
        </div>
        <div className="w-full lg:w-3/4 p-4 lg:p-6 border rounded-md shadow-lg">
          <h1 className="text-3xl text-center mb-6">All Users</h1>
        </div>
      </div>
    </Layout>
  );
}

export default Users;

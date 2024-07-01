import React from "react";
import Layout from "../../components/Layout";
import AdminMenu from "../../components/AdminMenu";
import { useAuth } from "../../context/auth";

function AdminDashboard() {
  const [auth, setAuth] = useAuth();
  return (
    <Layout>
      <div className="flex flex-col lg:flex-row justify-around items-start w-full p-6 space-y-6 lg:space-y-0 lg:space-x-6">
        <div className="w-full lg:w-1/3">
          <AdminMenu />
        </div>
        <div className="border w-full lg:w-2/3 p-6 rounded-md shadow-lg">
          <h1 className="text-3xl mb-4">ADMIN NAME: {auth?.user?.name}</h1>
          <h1 className="text-2xl mb-4">ADMIN EMAIL: {auth?.user?.email}</h1>
          <h1 className="text-2xl mb-4">ADMIN CONTACT: {auth?.user?.phone}</h1>
          <h1 className="text-2xl mb-4">ADMIN ADDRESS: {auth?.user?.address}</h1>
        </div>
      </div>
    </Layout>
  );
}

export default AdminDashboard;

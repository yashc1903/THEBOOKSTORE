import React from "react";
import Layout from "../../components/Layout";
import AdminMenu from "../../components/AdminMenu";
import { useAuth } from "../../context/auth";

function AdminDashboard() {
  const [auth, setAuth] = useAuth();

  return (
    <>
      <Layout>
        <div className="flex flex-col md:flex-row justify-center items-center w-full">
          <div className="md:w-1/4 flex justify-center mb-8 md:mb-0">
            <AdminMenu style={{ position: 'sticky', top: '160px' }} />
          </div>
          <div className="md:w-3/4 bg-white bg-opacity-60 px-8 text-center rounded-xl mt-6 md:mt-0 md:mr-4">
            <h1 className="text-3xl mt-10">ADMIN NAME: {auth?.user?.name}</h1>
            <h1 className="text-2xl mt-8">ADMIN EMAIL: {auth?.user?.email}</h1>
            <h1 className="text-2xl mt-8">ADMIN CONTACT: {auth?.user?.phone}</h1>
            <h1 className="text-2xl mt-8">ADMIN ADDRESS: {auth?.user?.address}</h1>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default AdminDashboard;

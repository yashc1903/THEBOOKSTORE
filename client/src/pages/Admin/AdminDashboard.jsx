import React from "react";
import Layout from "../../components/Layout";
import AdminMenu from "../../components/AdminMenu";
import { useAuth } from "../../context/auth";

function AdminDashboard() {
  const [auth, setAuth] = useAuth();
  return (
    <>
      <Layout>
        <div className="flex justify-around items-center w-full">
          <div className=" w-1/3">
            <AdminMenu />
          </div>
          <div className="border w-2/3 h-96 ">
            <h1 className="text-3xl w-full mt-10">
              ADMIN NAME : {auth?.user?.name}
            </h1>
            <h1 className="text-2xl w-full mt-10">
              ADMIN EMAIL : {auth?.user?.email}
            </h1>
            <h1 className="text-2xl w-full mt-10">
              ADMIN CONTACT : {auth?.user?.phone}
            </h1>
            <h1 className="text-2xl w-full mt-10">
              ADMIN ADDRESS : {auth?.user?.address}
            </h1>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default AdminDashboard;

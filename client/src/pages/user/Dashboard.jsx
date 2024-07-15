import React from "react";
import Layout from "../../components/Layout";
import { useAuth } from "../../context/auth.jsx";
import UserMenu from "../../components/UserMenu";

function Dashboard() {
  const [auth] = useAuth();

  return (
    <>
      <Layout>
        <div className="flex flex-col md:flex-row items-start md:items-center w-full">
          <div className="md:w-1/4 flex justify-center">
            <UserMenu style={{ position: 'absolute', top: '160px', width: '100%' }} />
          </div>
          <div className="md:w-3/4 md:border md:mt-36 md:bg-white md:bg-opacity-60 md:px-8 md:text-center md:rounded-xl mt-6">
            <h1 className="text-3xl mt-10">USER NAME: {auth?.user?.name}</h1>
            <h1 className="text-2xl mt-6">USER EMAIL: {auth?.user?.email}</h1>
            <h1 className="text-2xl mt-6">USER CONTACT: {auth?.user?.phone}</h1>
            <h1 className="text-2xl mt-6">USER ADDRESS: {auth?.user?.address}</h1>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Dashboard;

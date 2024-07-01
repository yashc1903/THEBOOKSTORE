import React from "react";
import Layout from "../../components/Layout";
import { useAuth } from "../../context/auth";
import UserMenu from "../../components/UserMenu";

function Dashboard() {
  const [auth] = useAuth();
  return (
    <>
      <Layout>
        <div className="flex flex-col md:flex-row justify-around items-start w-full min-h-screen">
          <div className="md:w-1/4 w-full">
            <UserMenu />
          </div>
          <div className="flex flex-col justify-center items-center border w-full md:w-3/4">
            <div className="flex flex-col items-center justify-center w-full light">
              <div className="w-2/3 bg-white rounded-lg shadow-md p-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">User Dashboard</h1>
                <h1 className="text-2xl mb-4">
                  USER NAME: {auth?.user?.name}
                </h1>
                <h1 className="text-2xl mb-4">
                  USER EMAIL: {auth?.user?.email}
                </h1>
                <h1 className="text-2xl mb-4">
                  USER CONTACT: {auth?.user?.phone}
                </h1>
                <h1 className="text-2xl mb-4">
                  USER ADDRESS: {auth?.user?.address}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Dashboard;

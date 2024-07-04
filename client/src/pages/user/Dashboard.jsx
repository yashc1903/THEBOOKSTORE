import React from "react";
import Layout from "../../components/Layout";
import { useAuth } from "../../context/auth.jsx";
import UserMenu from "../../components/UserMenu";

function Dashboard() {
  const [auth] = useAuth();
  return (
    <>
      <Layout>
        <div className="flex justify-around items-center w-full ">
          <div className="w-1/4  flex justify-center">
            <UserMenu  style={{position: 'absolute',top: '160px', width: '100%',}} />
          </div>
          <div className="border w-3/4 h-96  bg-white bg-opacity-60 px-8 text-center rounded-xl mt-36 mr-4  ">
            <h1 className="text-3xl w-full mt-10">
              USER NAME : {auth?.user?.name}
            </h1>
            <h1 className="text-2xl w-full mt-10">
              USER EMAIL : {auth?.user?.email}
            </h1>
            <h1 className="text-2xl w-full mt-10">
              USER CONTACT : {auth?.user?.phone}
            </h1>
            <h1 className="text-2xl w-full mt-10">
              USER ADDRESS : {auth?.user?.address}
            </h1>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Dashboard;

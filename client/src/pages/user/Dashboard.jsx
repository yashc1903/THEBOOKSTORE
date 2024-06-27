import React from 'react';
import Layout from '../../components/Layout';
import { useAuth } from '../../context/auth';
import UserMenu from '../../components/UserMenu';

function Dashboard() {
  const [auth] = useAuth();

  return (
    <Layout>
      <div className="flex flex-col md:flex-row justify-around items-start w-full min-h-screen">
        <div className="md:w-1/4 w-full">
          <UserMenu />
        </div>
        <div className="flex flex-col justify-center items-center border w-full md:w-3/4">
          <h1 className="text-3xl w-full mt-10 text-center">USER NAME: {auth?.user?.name}</h1>
          <h1 className="text-2xl w-full mt-10 text-center">USER EMAIL: {auth?.user?.email}</h1>
          <h1 className="text-2xl w-full mt-10 text-center">USER CONTACT: {auth?.user?.phone}</h1>
          <h1 className="text-2xl w-full mt-10 text-center">USER ADDRESS: {auth?.user?.address}</h1>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;

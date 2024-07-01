import React from 'react';
import Layout from '../../components/Layout';
import UserMenu from '../../components/UserMenu';

function Orders() {
  return (
    <Layout>
      <div className="flex flex-col md:flex-row justify-around items-start w-full min-h-screen">
        <div className="md:w-1/4 w-full">
          <UserMenu />
        </div>
        <div className="flex flex-col justify-center items-center border w-full md:w-3/4">
          <h1 className="text-3xl mt-4 text-center">Orders</h1>
          <div className="border w-3/4 h-96 mt-4 p-4">
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Orders;

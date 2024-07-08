import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import AdminMenu from "../../components/AdminMenu";
import axios from "axios";
import moment from "moment";

function Users() {
  const [users,setUsers] = useState([])
  const getAllUsers  = async () => {
    try {
      
      const { data } = await axios.get(
        `http://localhost:8080/get-users`
      );
      console.log(data)
      setUsers(data.users);
    } catch (error) {
      
      console.log(error);
    }
  }

  useEffect(()=>{getAllUsers()},[])

  return (
    <>
      <Layout>
        <div className="flex justify-center min-h-screen min-w-full  items-center">
          <div className=" w-1/4  flex justify-center">
            <AdminMenu  style={{position: 'absolute',top: '160px', width: '100%',}}/>
          </div>
          <div className=" w-3/4  min-h-full  ">
            
          <h1 className="text-center text-4xl  mx-auto mt-8 font-semibold text-black  bg-white rounded-full bg-opacity-60 w-56  mb-4">All Orders</h1>
            { 
            
              <section  className="overflow-auto">
                <div className="overflow-auto  rounded-lg mb-8 m-4">
                  <table className="min-w-full divide-y divide-gray-700 ">
                  <thead className="bg-gray-500 bg-opacity-100 ">
                      <tr>
                        <th className="py-3.5 px-4 text-2xl font-normal text-left rtl:text-right text-black"> No:</th>
                        <th className="py-3.5 px-4 text-2xl font-normal text-left rtl:text-right text-black">Name</th>
                        <th className="py-3.5 px-4 text-2xl font-normal text-left rtl:text-right text-black">Email</th>
                        <th className="py-3.5 px-4 text-2xl font-normal text-left rtl:text-right text-black">Address </th>
                        <th className="py-3.5 px-4 text-2xl font-normal text-left rtl:text-right text-black">Phone </th>
                        <th className="py-3.5 px-4 text-2xl font-normal text-left rtl:text-right text-black">Favourite Sport</th>
                        <th className="py-3.5 px-4 text-2xl font-normal text-left rtl:text-right text-black">Date</th>
                        
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white  overflow-y-auto">
                    {users.length >= 0 && users.map((user,i) => (
                      <tr className=""> 
                      <td className="px-4 py-4 whitespace-nowrap">
                      <div>
                        <h2 className="font-medium  text-xl text-black">{i+1}</h2>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                    <div>
                      <h2 className="font-medium text-xl text-black">{user.name}</h2>
                    </div>
                  </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                    <div>
                      <h2 className="font-medium text-xl text-black">{user.email}</h2>
                    </div>
                  </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                    <div>
                      <h2 className="font-medium text-xl text-black capitalize">{user.address}</h2>
                    </div>
                  </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                    <div>
                      <h2 className="font-medium text-xl text-black"> {user.phone} </h2>
                    </div>
                  </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                    <div>
                      <h2 className="font-medium text-xl text-black">{user.answer}</h2>
                    </div>
                  </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                    <div>
                      <h2 className="font-medium text-xl text-black">{moment(user.createdAt).format('MMMM Do YYYY')}</h2>
                    </div>
                  </td>
                    
                    
                      </tr>
                    ))}
                        
                    </tbody>
                  </table>
                 
                </div>
              </section>
              }
           
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Users;



// {moment(o.createdAt).format('h:mm:ss a')}
// {moment(o.createdAt).format('MMMM Do YYYY')}
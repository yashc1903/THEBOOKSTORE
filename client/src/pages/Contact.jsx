import React from "react";
import Layout from "../components/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";

function Contact() {
  return (
    <Layout>
      <div className="flex flex-col md:flex-row contactus">
        <div className="md:w-1/2">
          <img
            src="https://www.anandgroupindia.com/wp-content/uploads/2019/05/contactus.jpg"
            alt="contactus"
            className="w-full"
          />
        </div>
        <div className="md:w-1/3 mt-8 md:mt-0 md:ml-8">
          <h1 className="bg-gray-800 p-2 text-white text-center">CONTACT US</h1>
          <p className="text-justify mt-2">
            Any query and info about the product, feel free to call anytime. We
            are available 24x7.
          </p>
          <p className="mt-3 flex items-center">
            <BiMailSend className="mr-2" /> www.help@ecommerceapp.com
          </p>
          <p className="mt-3 flex items-center">
            <BiPhoneCall className="mr-2" /> 012-3456789
          </p>
          <p className="mt-3 flex items-center">
            <BiSupport className="mr-2" /> 1800-0000-0000 (toll-free)
          </p>
        </div>
      </div>
    </Layout>
  );
}

export default Contact;

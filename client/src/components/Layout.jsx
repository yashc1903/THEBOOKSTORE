import React from "react";
import Header from "./Header";
import Footer from "./Footer";

function Layout(props, title, description, keywords, author) {
  const pageStyle = {
    backgroundImage: 'url("https://images.unsplash.com/photo-1596123068611-c89d922a0f0a?q=80&w=2638&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")', // Replace with your image path
    backgroundSize: 'contain', // Adjusts image to cover the whole background
  // Prevents repeating the image
    backgroundPosition: 'center', // Centers the background image
    minHeight: '100vh' // Ensures the background covers the full height of the viewport
  };
  return (
    <>
      <div className="relative">
        <Header />
        <main className=" min-h-screen" style={pageStyle}>{props.children}</main>
        <Footer />
      </div>
    </>
  );
}

export default Layout;

import React from "react";
import Header from "./Header";
import Footer from "./Footer";

function Layout(props, title, description, keywords, author ) {
  const pageStyle = {
    backgroundImage: " linear-gradient(to right, #DAE2F8 , #D6A4A4)",
     // Replace with your image path
    backgroundSize: 'contain',
    backgroundOpacity : "0.6",
     // Adjusts image to cover the whole background
  // Prevents repeating the image
    backgroundPosition: 'center', // Centers the background image
    minHeight: '100vh' // Ensures the background covers the full height of the viewport
  };
  return (
    <>
      <div className="relative">
        <Header />
        <main className=" min-h-screen " style={pageStyle}>{props.children}</main>
        <Footer />
      </div>
    </>
  );
}

export default Layout;

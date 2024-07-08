import React from "react";
import Header from "./Header";
import Footer from "./Footer";

function Layout(props, title, description, keywords, author ) {
  const pageStyle = {
    backgroundImage: 'url("https://plus.unsplash.com/premium_photo-1669652639356-f5cb1a086976?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Ym9vayUyMHN0b3JlfGVufDB8fDB8fHww")', // Replace with your image path
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

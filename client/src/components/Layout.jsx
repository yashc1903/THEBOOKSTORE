import React from "react";
import Header from "./Header";
import Footer from "./Footer";

function Layout(props, title, description, keywords, author) {
  return (
    <>
      <div className="relative">
        <Header />
        <main className=" min-h-screen">{props.children}</main>
        <Footer />
      </div>
    </>
  );
}

export default Layout;

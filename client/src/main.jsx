import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/auth";
import "antd/dist/reset.css";
import { SearchProvider } from "./context/search.jsx";
import { CartProvider } from "./context/cart.jsx";
import { WishlistProvider } from "./context/wishllist.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <SearchProvider>
      <WishlistProvider>
        <CartProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </CartProvider>
      </WishlistProvider>
    </SearchProvider>
  </AuthProvider>
);

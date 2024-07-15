import React from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../context/auth.jsx';
import { useNavigate } from 'react-router-dom';
import { useWishlist } from '../context/wishllist';
import '../components/wishlist.css';
import { useCart } from '../context/cart.jsx';
import toast from 'react-hot-toast';

function WishlistPage() {
  const [auth, setAuth] = useAuth();
  const [wishlist, setWishlist] = useWishlist();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  const removeWishlistItem = (pid) => {
    try {
      let myWishlist = [...wishlist];
      let index = myWishlist.findIndex((item) => item._id === pid);
      myWishlist.splice(index, 1);
      setWishlist(myWishlist);
      localStorage.setItem('wishlist', JSON.stringify(myWishlist));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Layout>
        <div className="min-w-full flex min-h-screen p-4">
          <div className="w-full text-center p-4">
            <h1 className="text-center text-4xl mx-auto font-semibold text-black bg-white rounded-full bg-opacity-60 w-96 mb-4">
              Wishlist Items
            </h1>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {wishlist?.map((item) => (
                <div
                  className="flex flex-col items-center justify-between p-4 mb-4 rounded-md shadow-2xl bg-white bg-opacity-60"
                  key={item._id}
                >
                  <img
                    src={`http://localhost:8080/product/product-photo/${item._id}`}
                    alt={item.name}
                    className="h-48 w-full rounded-md mb-4 object-contain"
                  />
                  <div className="flex flex-col text-start w-full">
                    <ul>
                      <li className="text-3xl font-bold mb-2">{item.name}</li>
                      <li className="text-indigo-500 text-xl mb-2">
                        <span className="text-black">By:</span> {item.author}
                      </li>
                      <li className="text-2xl font-bold text-red-500 mb-2">
                        ₹ {item.price}
                      </li>
                    </ul>
                  </div>
                  <div className="flex justify-center items-center mt-4">
                    <button
                      onClick={() => removeWishlistItem(item._id)}
                      className="w-36 h-10 mr-2 px-4 py-2 rounded-md bg-red-700 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      Remove
                    </button>
                    <button
                      onClick={() => {
                        setCart([...cart, item]);
                        localStorage.setItem(
                          'cart',
                          JSON.stringify([...cart, item])
                        );
                        toast.success(`"${item.name}" added to the cart`);
                      }}
                      className="w-36 h-10 px-4 py-2 rounded-md bg-blue-700 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default WishlistPage;

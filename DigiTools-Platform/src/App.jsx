import { useState } from "react";
import { ToastContainer } from 'react-toastify'
import './App.css'
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import Stats from "./components/Stats";
import MainSection from "./components/MainSection";
import Steps from "./components/Steps";
import Pricing from "./components/Pricing";
import CTABanner from "./components/CTAbanner";
import Footer from "./components/Footer";

function App() {
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      if (prev.find((item) => item.id === product.id)) return prev;
      return [...prev, product];
    });
  };
 
  const handleRemoveFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };
 
  const handleCheckout = () => {
    setCartItems([]);
  };
  return (
        <div className="min-h-screen bg-white font-sans">
      <Navbar cartCount={cartItems.length} />
      <Banner />
      <Stats />
      <MainSection
        cartItems={cartItems}
        onAddToCart={handleAddToCart}
        onRemove={handleRemoveFromCart}
        onCheckout={handleCheckout}
      />
      <Steps />
      <Pricing />
      <CTABanner />
      <Footer />
 
      <ToastContainer
        position="bottom-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="light"
      />
    </div>
  )
}

export default App

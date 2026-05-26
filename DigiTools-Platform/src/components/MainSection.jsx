import { useState } from "react";
import products from "../products.json";
import ProductCard from "./ProductCard";
import CartSection from "./CartSection";

const MainSection = ({ cartItems, onAddToCart, onRemove, onCheckout }) => {
  const [activeTab, setActiveTab] = useState("products");

  return (
    <section className="py-16 px-6 md:px-16 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">Premium Digital Tools</h2>
          <p className="text-gray-500 mt-2 text-sm max-w-md mx-auto">
            Choose from our curated collection of premium digital products designed to boost
            your productivity and creativity.
          </p>

          {/* Toggle Buttons */}
          <div className="flex justify-center mt-6">
            <div className="bg-gray-200 rounded-full p-1 flex gap-1">
              <button
                onClick={() => setActiveTab("products")}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeTab === "products"
                    ? "bg-white text-gray-900 shadow"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Products
              </button>
              <button
                onClick={() => setActiveTab("cart")}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeTab === "cart"
                    ? "bg-violet-600 text-white shadow"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Cart ({cartItems.length})
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {activeTab === "products" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                cartItems={cartItems}
              />
            ))}
          </div>
        )}

        {/* Cart Section */}
        {activeTab === "cart" && (
          <CartSection
            cartItems={cartItems}
            onRemove={onRemove}
            onCheckout={onCheckout}
          />
        )}
      </div>
    </section>
  );
};

export default MainSection;
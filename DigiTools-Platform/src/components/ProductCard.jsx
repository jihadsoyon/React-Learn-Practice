import { CheckCircle } from "lucide-react";
import { toast } from "react-toastify";

const tagColors = {
  popular: "bg-yellow-100 text-yellow-700",
  new: "bg-green-100 text-green-700",
  bestseller: "bg-blue-100 text-blue-700",
  early: "bg-pink-100 text-pink-700",
};

const tagLabels = {
  popular: "Popular",
  new: "New",
  bestseller: "Best Seller",
  early: "Early Seller",
};

const ProductCard = ({ product, onAddToCart, cartItems }) => {
  const isInCart = cartItems.some((item) => item.id === product.id);

  const handleBuyNow = () => {
    if (isInCart) {
      toast.info(`${product.name} is already in your cart!`);
      return;
    }
    onAddToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="card bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 rounded-2xl p-5 flex flex-col gap-4 relative">
      {/* Tag Badge */}
      {product.tag && (
        <span
          className={`absolute top-4 right-4 text-xs font-semibold px-3 py-1 rounded-full ${
            tagColors[product.tagType] || "bg-gray-100 text-gray-600"
          }`}
        >
          {tagLabels[product.tagType] || product.tag}
        </span>
      )}

      {/* Icon */}
      <div className="text-4xl">{product.icon}</div>

      {/* Name & Description */}
      <div>
        <h3 className="font-bold text-gray-900 text-lg">{product.name}</h3>
        <p className="text-gray-500 text-sm mt-1 leading-relaxed">{product.description}</p>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-extrabold text-gray-900">${product.price}</span>
        <span className="text-sm text-gray-400">/{product.period}</span>
      </div>

      {/* Features */}
      <ul className="space-y-1">
        {product.features.map((feature, idx) => (
          <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
            <CheckCircle className="w-4 h-4 text-violet-500 flex-shrink-0" />
            {feature}
          </li>
        ))}
      </ul>

      {/* Buy Now Button */}
      <button
        onClick={handleBuyNow}
        className={`btn w-full rounded-full mt-auto ${
          isInCart
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-violet-600 hover:bg-violet-700 text-white"
        }`}
      >
        {isInCart ? "Added to Cart ✓" : "Buy Now"}
      </button>
    </div>
  );
};

export default ProductCard;
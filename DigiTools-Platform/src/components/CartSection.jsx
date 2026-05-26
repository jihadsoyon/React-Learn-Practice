import { toast } from "react-toastify";

const CartSection = ({ cartItems, onRemove, onCheckout }) => {
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  const handleRemove = (item) => {
    onRemove(item.id);
    toast.error(`${item.name} removed from cart.`);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.warn("Your cart is empty!");
      return;
    }
    onCheckout();
    toast.success("Checkout successful! Cart cleared.");
  };

  return (
    <div className="max-w-2xl mx-auto w-full">
      {cartItems.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-5xl mb-4">🛒</p>
          <p className="text-lg font-medium">Your cart is empty</p>
          <p className="text-sm mt-1">Browse products and add them to your cart.</p>
        </div>
      ) : (
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 space-y-4">
          <h2 className="font-bold text-gray-800 text-xl mb-2">Your Cart</h2>

          <div className="space-y-3">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{item.name}</p>
                    <p className="text-gray-500 text-xs">${item.price}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleRemove(item)}
                  className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <span className="text-gray-500 text-sm">Total:</span>
            <span className="text-2xl font-extrabold text-gray-900">${total}</span>
          </div>

          {/* Checkout Button */}
          <button
            onClick={handleCheckout}
            className="btn bg-violet-600 hover:bg-violet-700 text-white w-full rounded-full"
          >
            Proceed To Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default CartSection;
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Cart = () => {
  const { state, dispatch } = useContext(AppContext);

  const addItem = () => {
    const item = {
      id: Date.now(),
      name: "React Course",
    };

    dispatch({
      type: "ADD_TO_CART",
      payload: item,
    });
  };

  return (
    <div className="card">
      <h3>Cart ({state.cart.length})</h3>

      <button onClick={addItem} className="btn">
        Add Item
      </button>

      {state.cart.map((item) => (
        <div key={item.id} className="item">
          <p>{item.name}</p>

          <button
            onClick={() =>
              dispatch({
                type: "REMOVE_FROM_CART",
                payload: item.id,
              })
            }
            className="remove-btn"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default Cart;
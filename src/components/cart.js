import React from "react";
import "./cart.css";
import cartImg from "../images/cart3.png";

function Cart() {
  const cartData = JSON.parse(localStorage.getItem("cart"));

  const calculateTotalPrice = () => {
    let total = 0;
    if (cartData) {
      Object.values(cartData).forEach((item) => {
        total += parseFloat(item.totalPrice);
      });
    }
    return total.toFixed(2);
  };

  const handlePurchase = () => {
    localStorage.removeItem("cart");
    window.location.reload();
  };

  return (
    <div id="cartContainer">
      <div id="containerName">
        <button
          id="purchaseButton"
          disabled={!cartData || Object.keys(cartData).length === 0}
          onClick={handlePurchase}
        >
          Purchase
        </button>
      </div>

      <div id="cartContentContainer">
        {cartData && Object.keys(cartData).length !== 0 ? (
          <div>
            {Object.values(cartData).map((item) => (
              <div className="itemContainer" key={item.id}>
                <div className="bookName cartItemElement">{item.title}</div>
                <div className="count cartItemElement">{item.quantity}</div>
                <div className="price cartItemElement">{item.price}</div>
                <div className="totalPrice cartItemElement">
                  {item.totalPrice}
                </div>
              </div>
            ))}

            <div id="sumTotal">Total price, $ {calculateTotalPrice()}</div>
          </div>
        ) : (
          <div className="emptyCartContainer">
            <img src={cartImg} alt="Cart empty" />
            <div className="emptyCartText">Cart empty...</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;

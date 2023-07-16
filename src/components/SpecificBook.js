import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { BooksContext } from "../context/BooksContext";
import "./specificBook.css";
import placeholderImage from "../images/imageNotFound.png";

// v1

function SpecificBook() {
  const { id } = useParams();
  const books = useContext(BooksContext);

  const book = books.find((item) => item.id === parseInt(id));
  const [quantityInput, setQuantityInput] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const productPrice = book.price || 0;

  useEffect(() => {
    const newTotalPrice = productPrice * quantityInput;
    setTotalPrice(newTotalPrice.toFixed(2));
  }, [productPrice, quantityInput]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || {};
    if (cart.hasOwnProperty(id)) {
      setQuantityInput(cart[id].quantity);
    }
  }, [id]);

  const handleQuantityChange = (event) => {
    const newQuantity = Math.min(Math.max(1, parseInt(event.target.value)), 42);
    setQuantityInput(newQuantity);
  };

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || {};

    if (cart.hasOwnProperty(id)) {
      cart[id].quantity = quantityInput;
      cart[id].totalPrice = totalPrice;
    } else {
      cart[id] = {
        id: book.id,
        title: book.title,
        price: book.price,
        quantity: quantityInput,
        totalPrice: totalPrice,
      };
    }

    localStorage.setItem("cart", JSON.stringify(cart));
  };

  return (
    <div data-testid="specific-book-component">
      <div id="contentContainer">
        <img
          src={book.image || placeholderImage}
          alt={book.title}
          id="bookImage"
        />
        <div id="bookInfo">
          <h2>{book.title}</h2>
          <p>{book.author}</p>
          <p>{book.category}</p>
          <p>{book.level}</p>
        </div>
        <div id="orderContainer">
          <div className="orderEl">Price $</div>
          <div className="orderEl rightAlign" id="productPrice">
            {productPrice}
          </div>
          <div className="orderEl">Count</div>
          <input
            type="number"
            id="quantityInput"
            data-testid="quantityInput"
            className="orderEl"
            name="quantity"
            value={quantityInput}
            onChange={handleQuantityChange}
          />
          <div className="orderEl">Total price $</div>
          <div
            className="orderEl rightAlign"
            id="totalPrice"
            data-testid="totalPrice"
          >
            {totalPrice}
          </div>
          <button
            type="submit"
            id="addToCart"
            className="orderEl"
            onClick={handleAddToCart}
          >
            Add to cart
          </button>
        </div>
        <div id="bookDescription">
          <p>{book.description}</p>
        </div>
      </div>
    </div>
  );
}

export default SpecificBook;

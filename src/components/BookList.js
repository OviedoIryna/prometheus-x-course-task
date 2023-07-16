import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BooksContext } from "../context/BooksContext";
import searchIcon from "../images/search.png";
import "./bookList.css";
import placeholderImage from "../images/imageNotFound.png";

function BookList() {
  const [searchText, setSearchText] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");
  const navigate = useNavigate();
  const books = useContext(BooksContext);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handlePriceFilterChange = (event) => {
    setPriceFilter(event.target.value);
  };

  const handleClickView = (book) => {
    navigate({
      pathname: `/specificbook/${book.id}`,
    });
  };

  const truncateTitle = (title) => {
    if (title.length > 24) {
      return title.substring(0, 24) + "...";
    }
    return title;
  };

  return (
    <main>
      <section id="searchSection">
        <div id="searchElement">
          <input
            type="text"
            id="search"
            placeholder="Search by book name"
            value={searchText}
            onChange={handleSearchChange}
          />
          <img src={searchIcon} alt="search" id="searchIcon" />
        </div>
        <select
          name="prices"
          id="priceSelect"
          value={priceFilter}
          onChange={handlePriceFilterChange}
        >
          <option value="all">All</option>
          <option value="upTo15">up to $15</option>
          <option value="between15and30">between $15 and $30</option>
          <option value="moreThan30">more than $30</option>
        </select>
      </section>
      <section id="contentContainer">
        {books
          .filter((book) =>
            book.title.toLowerCase().includes(searchText.toLowerCase())
          )
          .filter((book) => {
            if (priceFilter === "upTo15") {
              return book.price <= 15;
            } else if (priceFilter === "between15and30") {
              return book.price > 15 && book.price <= 30;
            } else if (priceFilter === "moreThan30") {
              return book.price > 30;
            }
            return true;
          })
          .map((book) => (
            <div key={book.id} className="productContainer">
              <img
                src={book.image || placeholderImage}
                alt={book.title}
                className="productImg"
              />
              <div className="rowPC">{truncateTitle(book.title)}</div>
              <div className="rowPC">{book.author}</div>
              <div className="rowPC2">Price: {book.price}$</div>
              <input
                type="submit"
                value="View"
                className="viewButton"
                onClick={() => handleClickView(book)}
              />
            </div>
          ))}
      </section>
    </main>
  );
}

export default BookList;

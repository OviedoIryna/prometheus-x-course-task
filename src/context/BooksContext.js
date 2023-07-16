import React, { createContext, useEffect, useState } from "react";

const BooksContext = createContext();

const BooksProvider = ({ children }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = () => {
    fetch("books.json")
      .then((response) => response.json())
      .then((data) => {
        setBooks(data.books);
      })
      .catch((error) => {
        console.log("Помилка при зчитуванні файлу:", error);
      });
  };

  return (
    <BooksContext.Provider value={books}>{children}</BooksContext.Provider>
  );
};

export { BooksContext, BooksProvider };

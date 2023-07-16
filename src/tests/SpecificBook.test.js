import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import SpecificBook from "../components/SpecificBook";
import { BooksContext } from "../context/BooksContext";
import { fireEvent } from "@testing-library/react";

const mockBooks = [
  { id: 1, title: "Book 1", author: "Author 1", price: 10.99 },
  { id: 2, title: "Book 2", author: "Author 2", price: 19.99 },
];

describe("SpecificBook", () => {
  it("renders SpecificBook component without errors", () => {
    render(
      <MemoryRouter initialEntries={[`/books/1`]}>
        <Routes>
          <Route
            path="/books/:id"
            element={
              <BooksContext.Provider value={mockBooks}>
                <SpecificBook />
              </BooksContext.Provider>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    const specificBookElement = screen.getByTestId("specific-book-component");
    expect(specificBookElement).toBeInTheDocument();
  });

  it("increases quantity when clicked on increase button", () => {
    render(
      <MemoryRouter initialEntries={[`/books/1`]}>
        <Routes>
          <Route
            path="/books/:id"
            element={
              <BooksContext.Provider value={mockBooks}>
                <SpecificBook />
              </BooksContext.Provider>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    const quantityInput = screen.getByTestId("quantityInput");

    expect(quantityInput.value).toBe("1");

    fireEvent.change(quantityInput, { target: { value: "2" } });

    expect(quantityInput.value).toBe("2");
  });

  it("decreases quantity when down arrow key is pressed", () => {
    render(
      <MemoryRouter initialEntries={[`/books/1`]}>
        <Routes>
          <Route
            path="/books/:id"
            element={
              <BooksContext.Provider value={mockBooks}>
                <SpecificBook />
              </BooksContext.Provider>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    const quantityInput = screen.getByTestId("quantityInput");

    expect(quantityInput.value).toBe("1");

    fireEvent.change(quantityInput, { target: { value: "3" } });

    fireEvent.keyDown(quantityInput, { key: "ArrowDown" });

    expect(quantityInput.value).toBe("3");
  });

  it("updates total price when quantity is changed", () => {
    render(
      <MemoryRouter initialEntries={[`/books/1`]}>
        <Routes>
          <Route
            path="/books/:id"
            element={
              <BooksContext.Provider value={mockBooks}>
                <SpecificBook />
              </BooksContext.Provider>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    const quantityInput = screen.getByTestId("quantityInput");
    const totalPrice = screen.getByTestId("totalPrice");

    expect(quantityInput.value).toBe("1");
    expect(totalPrice.textContent).toBe("10.99");

    fireEvent.change(quantityInput, { target: { value: "3" } });

    expect(quantityInput.value).toBe("3");
    expect(totalPrice.textContent).toBe("32.97");
  });
});

// import React from "react";
// import { render, screen } from "@testing-library/react";
// import { MemoryRouter, Routes, Route } from "react-router-dom";
// import SpecificBook from "../components/SpecificBook";
// import { BooksContext } from "../context/BooksContext";

// const mockBooks = [
//   { id: 1, title: "Book 1", author: "Author 1", price: 10.99 },
//   { id: 2, title: "Book 2", author: "Author 2", price: 19.99 },
// ];

// describe("SpecificBook", () => {
//   it("renders SpecificBook component without errors", () => {
//     render(
//       <MemoryRouter initialEntries={[`/books/1`]}>
//         <Routes>
//           <Route
//             path="/books/:id"
//             element={
//               <BooksContext.Provider value={mockBooks}>
//                 <SpecificBook />
//               </BooksContext.Provider>
//             }
//           />
//         </Routes>
//       </MemoryRouter>
//     );

//     const specificBookElement = screen.getByTestId("specific-book-component");
//     expect(specificBookElement).toBeInTheDocument();
//   });
// });

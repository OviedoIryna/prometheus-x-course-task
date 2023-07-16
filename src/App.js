import React, { useState, useEffect } from "react";
import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { BooksProvider } from "./context/BooksContext";
import SignIn from "./components/Signin";
import BookList from "./components/BookList";
import SpecificBook from "./components/SpecificBook";
import Cart from "./components/cart";
import NotFoundPage from "./components/NotFoundPage";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedIsAuthenticated = localStorage.getItem("isAuthenticated");
    if (storedIsAuthenticated) {
      setIsAuthenticated(JSON.parse(storedIsAuthenticated));
    }

    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleSignIn = (name) => {
    setIsAuthenticated(true);
    setUsername(name);
    localStorage.setItem("isAuthenticated", true);
    localStorage.setItem("username", name);
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    setUsername("");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("username");
  };

  return (
    <Router>
      <BooksProvider>
        <Header
          username={username}
          isAuthenticated={isAuthenticated}
          handleSignOut={handleSignOut}
        />
        <Routes>
          <Route path="/" element={<SignIn onSignIn={handleSignIn} />} />
          <Route path="/signin" element={<SignIn onSignIn={handleSignIn} />} />
          <Route
            path="/booklist"
            element={isAuthenticated ? <BookList /> : <Navigate to="/signin" />}
          />
          <Route
            path="/specificbook/:id"
            element={
              isAuthenticated ? <SpecificBook /> : <Navigate to="/signin" />
            }
          />
          <Route
            path="/cart"
            element={isAuthenticated ? <Cart /> : <Navigate to="/signin" />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </BooksProvider>
    </Router>
  );
}

export default App;

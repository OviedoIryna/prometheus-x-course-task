import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./header.css";
import cart from "../images/cart3.png";
import avatar from "../images/avatar.png";

function Header({ isAuthenticated, handleSignOut }) {
  const location = useLocation();
  const navigate = useNavigate();
  const showHeaderElements =
    location.pathname === "/signin" || location.pathname === "/";

  useEffect(() => {
    const userName = localStorage.getItem("userName");
    if (userName) {
      setUserName(userName);
    }
  }, []);

  const [userName, setUserName] = React.useState("");

  const handleSignOutClick = () => {
    handleSignOut();
    navigate("/signin");
  };

  const handleToCart = () => {
    navigate("/cart");
  };

  return (
    <header>
      <div className="topBar">
        <h1>JS BAND STORE / Oviedo Almuedo Iryna</h1>
        {!showHeaderElements && (
          <>
            <img src={avatar} alt="user avatar" />
            <button onClick={handleSignOutClick}>Sign-Out</button>
            <img src={cart} alt="shopping cart" onClick={handleToCart} />
            <p>{userName}</p>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;

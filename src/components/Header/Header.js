import React from "react";
import "./HeaderStyle.scss";
const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header__inner">
          <div className="header__logo">
            <img loading="lazy" src="./assets/images/logo.svg" alt="logo" width={38} height={26}/>
            <span>TESTTASK</span>
          </div>
          <div className="header__buttons">
            <button className="btn yellow">Users</button>
            <button className="btn yellow">Sign up</button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

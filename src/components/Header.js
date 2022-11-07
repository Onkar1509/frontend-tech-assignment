import React from "react";
import GithubIcon from "../assets/githubIcon.png";

function Header() {
  return (
    <>
      <div className="navbarMainDiv">
        <div className="navbarSubDiv">
          <img src={GithubIcon} alt="github" />
          <div className="navList">Product</div>
          <div className="navList">Solutions</div>
          <div className="navList">Open Source</div>
          <div className="navList">Pricing</div>
        </div>
        <div className="navbarSubDiv">
          <input type={"text"} placeholder="Search" />
          <button className="signInBtn">Sign In</button>
          <button className="signUpBtn">Sign up</button>
        </div>
      </div>
    </>
  );
}

export default Header;

import React from "react";
import { Link, NavLink } from "react-router-dom";
//Link is like anchor tag but react-router handles the click so the page doesn't reload
//Navlink allows custom styling when the link is active

const activeStyle = {
  color: "green",
};

export default function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">
              <img alt="Carved Rock Fitness" src="/images/logo.png" />
            </Link>
          </li>
          <li>
            <NavLink activeStyle={activeStyle} to="/shoes">
              Shoes
            </NavLink>
          </li>
          <li>
            <NavLink activeStyle={activeStyle} to="/Cart">
              Cart
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

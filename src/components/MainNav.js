import React from "react";
import { NavLink } from "react-router-dom";

const MainNav = () => {
  return (
    <nav className="MainNav">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/ManageComics">Manage Comics</NavLink>
      <NavLink to="/ManageCharacters">Manage Characters</NavLink>
      <NavLink to="/Comics">Comics</NavLink>
      <NavLink to="Characters">Characters</NavLink>
    </nav>
  );
};

export default MainNav;

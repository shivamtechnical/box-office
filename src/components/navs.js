import React from "react";
import { useLocation } from "react-router-dom";

import { NavList, LinkStyled } from "./navs.styled";
const LINKS = [
  { to: "/", text: "Home" },
  { to: "/Started", text: "Started" },
];
const Navs = () => {
  const location = useLocation();
  console.log("location", location);
  return (
    <div>
      <NavList>
        {LINKS.map((item) => (
          <li key={item.to}>
            <LinkStyled
              to={item.to}
              className={item.to === location.pathname ? "active " : " "}
            >
              {item.text}
            </LinkStyled>
          </li>
        ))}
      </NavList>
    </div>
  );
};

export default Navs;

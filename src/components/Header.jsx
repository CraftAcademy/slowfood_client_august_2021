import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

const Header = () => {
  const { authenticated, currentUser } = useSelector((state) => state);
  const [activeItem, setActiveItem] = useState();
  const dispatch = useDispatch();
  return (
    <Menu inverted data-cy="header">
      <Menu.Item
        id="home"
        name="home"
        as={Link}
        to={{ pathname: "/" }}
        data-cy="home"
        active={activeItem === "home"}
        onClick={setActiveItem}
      >
        Home
      </Menu.Item>
      <Menu.Item
        id="menu"
        name="menu"
        as={Link}
        to={{ pathname: "/Menu" }}
        active={activeItem === "menu"}
        onClick={setActiveItem}
        data-cy="menu"
      >
        Menu
      </Menu.Item>
      <Menu.Item
        id="about"
        name="about"
        as={Link}
        to={{ pathname: "/About" }}
        active={activeItem === "about"}
        onClick={setActiveItem}
        data-cy="about"
      >
        About
      </Menu.Item>
      {!authenticated ? (
        <React.Fragment>
          <Menu.Item
            data-cy="btn-login"
            active={activeItem === "signup"}
            onClick={() => dispatch({ type: "TOGGLE_LOGIN_UI_VISIBILITY" })}
          >
            Login
          </Menu.Item>

          <Menu.Item
            position="right"
            id="signup"
            name="signup"
            as={Link}
            to={{ pathname: "/signup" }}
            data-cy="btn-signup"
            active={activeItem === "signup"}
            onClick={setActiveItem}
          >
            Sign up
          </Menu.Item>
        </React.Fragment>
      ) : 
      
        <Menu.Item data-cy="user_name">logged in as: {currentUser.email}</Menu.Item>
      }
    </Menu>
  );
};

export default Header;

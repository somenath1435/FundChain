import React from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "../routes";

export default () => {
  return (
    <Menu>
      <Link route="/">
        <a className="item">FundChain</a>
      </Link>

      <Menu.Menu position="right">
        <Link route="/register">
          <a className="item">Register</a>
        </Link>

        <Link route="/login">
          <a className="item">Login</a>
        </Link>
      </Menu.Menu>
    </Menu>
  );
};

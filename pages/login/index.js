import React, { Component } from "react";
import { Card, Button } from "semantic-ui-react";
import Layout from "../../components/Layout";
import { Link } from "../../routes";

class Login extends Component {
  render() {
    return (
      <Layout>
        <h1>Login Here!</h1>
        <Link route="/login/user">
          <a>
            <Button content="Login User" primary />
          </a>
        </Link>
        <br></br>
        <br></br>
        <Link route="/login/approver">
          <a>
            <Button content="Login Approver" primary />
          </a>
        </Link>
        
      </Layout>
    );
  }
}

export default Login;

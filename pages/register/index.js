import React, { Component } from "react";
import { Card, Button } from "semantic-ui-react";
import Layout from "../../components/Layout";
import { Link } from "../../routes";

class Register extends Component {
  render() {
    return (
      <Layout>
        <h1>Register Here!</h1>
        <Link route="/register/user">
          <a>
            <Button content="Register User" icon="add circle" primary />
          </a>
        </Link>
        <br></br>
        <br></br>
        <Link route="/register/approver">
          <a>
            <Button content="Register Approver" icon="add circle" primary />
          </a>
        </Link>
        
      </Layout>
    );
  }
}

export default Register;

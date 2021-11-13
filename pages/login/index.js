import React, { Component } from "react";
import { Container, Header } from "semantic-ui-react";
import { Card, Button } from "semantic-ui-react";
import Layout from "../../components/Layout";
import { Link } from "../../routes";
import UserLogin from "./user";
import ApproverLogin from "./approver";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUser: true,
      isApprover: false,
    };

    this.setUser = this.setUser.bind(this);
    this.setApprover = this.setApprover.bind(this);
  }

  setUser() {
    this.setState({ isUser: true, isApprover: false });
  }

  setApprover() {
    this.setState({ isUser: false, isApprover: true });
  }
  render() {
    return (
      <Layout>
        <Container>
          <Header size="medium" style={{ color: "#ffffff" }}>
            Login As {this.state.isApprover ? "Approver" : "User"}
          </Header>
          {this.state.isApprover && <ApproverLogin />}
          {this.state.isUser && <UserLogin />}
          <Button.Group>
            <Button secondary positive={this.state.isUser} onClick={this.setUser}>
              User
            </Button>
            <Button.Or />
            <Button secondary positive={this.state.isApprover} onClick={this.setApprover}>
              Approver
            </Button>
          </Button.Group>
        </Container>
      </Layout>
    );
  }
}

export default Login;

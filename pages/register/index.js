import React, { Component } from "react";
import { Container, Header } from "semantic-ui-react";
import { Card, Button } from "semantic-ui-react";
import Layout from "../../components/Layout";
import { Link } from "../../routes";
import UserRegistration from "./user";
import ApproverRegsitration from "./approver";

class Register extends Component {
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
            Register As {this.state.isApprover ? "Approver" : "User"}
          </Header>
          <Button.Group style={{ margin: "0 0 20px 0" }}>
            <Button secondary positive={this.state.isUser} onClick={this.setUser}>
              User
            </Button>
            <Button.Or />
            <Button secondary positive={this.state.isApprover} onClick={this.setApprover}>
              Approver
            </Button>
          </Button.Group>
          {this.state.isApprover && <ApproverRegsitration />}
          {this.state.isUser && <UserRegistration />}
        </Container>
      </Layout>
    );
  }
}

export default Register;

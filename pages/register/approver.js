import React, { Component } from "react";
import { Card, Button, Form, Input, Message } from "semantic-ui-react";
import Layout from "../../components/Layout";
import { Link, Router } from "../../routes";
import factory from "../../ethereum/factory_approvers";
import web3 from "../../ethereum/web3";

class Approver extends Component {
  state = {
    firstname: "",
    lastname: "",
    phone: "",
    organisation: "",
    ethaddress: "",
    email: "",
    errorMessage: "",
    loading: false,
  };

  onSubmit = async (event) => {
    event.preventDefault();

    this.setState({ loading: true, errorMessage: "" });

    try {
      //write
      const accounts = await web3.eth.getAccounts();
      console.log("accounts[0] is " + accounts[0]);
      const st = this.state;
      await factory.methods
        .registerapprover(
          st.firstname,
          st.lastname,
          st.email,
          st.phone,
          st.ethaddress,
          st.organisation
        )
        .send({ from: accounts[0] });

      Router.replaceRoute(`/approver/${this.state.ethaddress}`);

      // Router.replaceRoute(`/user/${this.props.address}`);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({
      loading: false,
      firstname: "",
      lastname: "",
      phone: "",
      organisation: "",
      ethaddress: "",
      email: "",
    });
  };

  render() {
    return (
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Enter Approver First Name</label>
            <Input
              value={this.state.firstname}
              onChange={(event) =>
                this.setState({ firstname: event.target.value })
              }
            />
          </Form.Field>
          <Form.Field>
            <label>Enter Approver Last Name</label>
            <Input
              value={this.state.lastname}
              onChange={(event) =>
                this.setState({ lastname: event.target.value })
              }
            />
          </Form.Field>
          <Form.Field>
            <label>Enter Approver Phone Number</label>
            <Input
              value={this.state.phone}
              onChange={(event) => this.setState({ phone: event.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <label>Enter Approver Organisation</label>
            <Input
              value={this.state.organisation}
              onChange={(event) =>
                this.setState({ organisation: event.target.value })
              }
            />
          </Form.Field>
          <Form.Field>
            <label>Enter Approver Ethereum Address</label>
            <Input
              value={this.state.ethaddress}
              onChange={(event) =>
                this.setState({ ethaddress: event.target.value })
              }
            />
          </Form.Field>
          <Form.Field>
            <label>Enter Approver Email</label>
            <Input
              value={this.state.email}
              onChange={(event) => this.setState({ email: event.target.value })}
            />
          </Form.Field>

          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button primary loading={this.state.loading}>
            Register!
          </Button>
        </Form>
    );
  }
}

export default Approver;

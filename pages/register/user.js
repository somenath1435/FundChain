import React, { Component } from "react";
import { Card, Button, Form, Input, Message } from "semantic-ui-react";
import Layout from "../../components/Layout";
import { Link, Router } from "../../routes";
import factory from "../../ethereum/factory_user";
import web3 from "../../ethereum/web3";

class User extends Component {
  state = {
    firstname: "",
    lastname: "",
    phone: "",
    adhaar: "",
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
        .registeruser(st.firstname, st.lastname, st.phone, st.adhaar, st.ethaddress, st.email)
        .send({ from: accounts[0] });

      Router.replaceRoute(`/user/${this.state.ethaddress}`);

      // Router.replaceRoute(`/user/${this.props.address}`);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({
      loading: false,
      firstname: "",
      lastname: "",
      phone: "",
      adhaar: "",
      ethaddress: "",
      email: "",
    });
  };

  render() {
    return (
      <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
        <Form.Field>
          <label style={{ color: "#ffffff" }}>Enter User First Name</label>
          <Input value={this.state.firstname} onChange={(event) => this.setState({ firstname: event.target.value })} />
        </Form.Field>
        <Form.Field>
          <label style={{ color: "#ffffff" }}>Enter User Last Name</label>
          <Input value={this.state.lastname} onChange={(event) => this.setState({ lastname: event.target.value })} />
        </Form.Field>
        <Form.Field>
          <label style={{ color: "#ffffff" }}>Enter User Phone Number</label>
          <Input value={this.state.phone} onChange={(event) => this.setState({ phone: event.target.value })} />
        </Form.Field>
        <Form.Field>
          <label style={{ color: "#ffffff" }}>Enter User Adhaar Number</label>
          <Input value={this.state.adhaar} onChange={(event) => this.setState({ adhaar: event.target.value })} />
        </Form.Field>
        <Form.Field>
          <label style={{ color: "#ffffff" }}>Enter User Ethereum Address</label>
          <Input
            value={this.state.ethaddress}
            onChange={(event) => this.setState({ ethaddress: event.target.value })}
          />
        </Form.Field>
        <Form.Field>
          <label style={{ color: "#ffffff" }}>Enter User Email</label>
          <Input value={this.state.email} onChange={(event) => this.setState({ email: event.target.value })} />
        </Form.Field>

        <Message error header="Oops!" content={this.state.errorMessage} />
        <Button color="violet" loading={this.state.loading}>
          Register!
        </Button>
      </Form>
    );
  }
}

export default User;

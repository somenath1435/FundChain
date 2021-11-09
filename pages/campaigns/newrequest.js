import React, { Component } from "react";
import { Form, Button, Input, Message } from "semantic-ui-react";
import Layout from "../../components/layoutlogout";
import campaignfactory from "../../ethereum/campaigns";
import approverfactory from "../../ethereum/factory_approvers";
import ApproverInstance from "../../ethereum/approvers";
import web3 from "../../ethereum/web3";
import { Router } from "../../routes";

class RequestNew extends Component {
  state = {
    value: "",
    desc: "",
    ethaddress: "",
    errorMessage: "",
    successMessage: "",
    loading: false,
  };

  static async getInitialProps(props) {
    //call api
    const campaignid = props.query.campaignid;
    return { campaignid };
  }

  onSubmit = async (event) => {
    event.preventDefault();

    this.setState({ loading: true, errorMessage: "", successMessage: "" });

    try {
      const accounts = await web3.eth.getAccounts();
      const campaignid = this.props.campaignid;

      const requestid = await campaignfactory.methods.requestcount().call();
      const campaign = await campaignfactory.methods.campaigns(campaignid).call();
      const list = await campaignfactory.methods.give_backerslist(campaignid).call();
      const backerslist = campaign.backerslist;
      const count = campaign.backerscount;
      console.log(backerslist);
      console.log(count);
      console.log(requestid);
      console.log(campaign);
      console.log(list);

      // await campaignfactory.methods
      //   .create_spend_Request(this.state.desc, this.state.value, this.state.ethaddress, campaignid)
      //   .send({ from: accounts[0] });

      // this.setState({
      //   successMessage: "Your spend request is successfully created",
      // });
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false });
  };

  render() {
    return (
      <Layout>
        <h3>Create a Spend Request</h3>

        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Spend Amount</label>
            <Input
              label="ether"
              labelPosition="right"
              value={this.state.value}
              onChange={(event) => this.setState({ value: event.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <label>Enter Description</label>
            <Input value={this.state.desc} onChange={(event) => this.setState({ desc: event.target.value })} />
          </Form.Field>
          <Form.Field>
            <label>Recipient Ethereum Address</label>
            <Input
              value={this.state.ethaddress}
              onChange={(event) => this.setState({ ethaddress: event.target.value })}
            />
          </Form.Field>

          <Button loading={this.state.loading} primary>
            Create Request!
          </Button>
        </Form>
        {this.state.errorMessage && <Message error header="Oops!" content={this.state.errorMessage} />}

        {this.state.successMessage && <Message success header="Congratulations!" content={this.state.successMessage} />}
      </Layout>
    );
  }
}

export default RequestNew;

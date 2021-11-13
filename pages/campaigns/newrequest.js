import React, { Component } from "react";
import { Form, Button, Input, Message, TextArea } from "semantic-ui-react";
import Layout from "../../components/layoutlogout";
import campaignfactory from "../../ethereum/campaigns";
import approverfactory from "../../ethereum/factory_approvers";
import ApproverInstance from "../../ethereum/approvers";
import User1 from "../../ethereum/user";
import userfactory from "../../ethereum/factory_user";
import web3 from "../../ethereum/web3";
import { Router } from "../../routes";
import IPFSUpload from "../../components/IPFSUpload";

class RequestNew extends Component {
  // state = {
  //   value: "",
  //   desc: "",
  //   ethaddress: "",
  //   errorMessage: "",
  //   successMessage: "",
  //   loading: false,
  // };

  constructor(props) {
    super(props);
    this.state = {
      value: "",
      desc: "",
      ethaddress: "",
      errorMessage: "",
      successMessage: "",
      loading: false,
      fileLink: "",
    };
    this.setLink = this.setLink.bind(this);
  }

  setLink = (link) => {
    this.setState({ fileLink: link });
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

      console.log(this.state.fileLink);
      const link = this.state.fileLink ? this.state.fileLink : "0x0000000000000000";
      console.log("uploaded link: " + link);

      const requestid = await campaignfactory.methods.requestcount().call();
      const campaign = await campaignfactory.methods.campaigns(campaignid).call();
      const backerslist = await campaignfactory.methods.get_backerslist(campaignid).call();
      // const rlist = await campaignfactory.methods.get_requestlist(campaignid).call();
      // const rcount = await campaignfactory.methods.requestlist_size(campaignid).call();
      const count = campaign.backerscount;
      console.log(count);
      // console.log(requestid);
      // console.log(campaign);
      console.log(backerslist);
      // console.log(rcount);
      // console.log(rlist);
      const newvalue = web3.utils.toWei(this.state.value, "ether");

      await campaignfactory.methods
        .create_spend_Request(this.state.desc, newvalue, this.state.ethaddress, campaignid, link)
        .send({ from: accounts[0] });

      for (let i = 0; i < count; i++) {
        const backeradd = backerslist[i];
        const addr = await userfactory.methods.getstoreaddress(backeradd).call();
        const user1 = User1(addr);
        await user1.methods.insert_request(requestid).send({ from: accounts[0] });
      }

      this.setState({
        successMessage: "Your spend request is successfully created",
      });
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false });
  };

  render() {
    return (
      <Layout>
        <h3 style={{ color: "#ffffff" }}>Create a Spend Request</h3>

        <IPFSUpload setLink={this.setLink} />
        <h4 style={{ color: "#ffffff" }}>
          {this.state.fileLink ? "Status: Upload Successful" : "Status: No files uploaded"}
        </h4>

        <br />
        <br />

        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label style={{ color: "#ffffff" }}>Spend Amount</label>
            <Input
              label="ether"
              labelPosition="right"
              value={this.state.value}
              onChange={(event) => this.setState({ value: event.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <label style={{ color: "#ffffff" }}>Enter Description</label>
            <TextArea value={this.state.desc} onChange={(event) => this.setState({ desc: event.target.value })} />
          </Form.Field>
          <Form.Field>
            <label style={{ color: "#ffffff" }}>Recipient Ethereum Address</label>
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

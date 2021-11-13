import React, { Component } from "react";
import { Form, Button, Input, Message, TextArea } from "semantic-ui-react";
import Layout from "../../components/layoutlogout";
import campaignfactory from "../../ethereum/campaigns";
import approverfactory from "../../ethereum/factory_approvers";
import ApproverInstance from "../../ethereum/approvers";
import web3 from "../../ethereum/web3";
import { Router } from "../../routes";
import IPFSUpload from "../../components/IPFSUpload";

class CampaignNew extends Component {
  // state = {
  //   minimumContribution: "",
  //   city: "",
  //   desc: "",
  //   ethaddress: "",
  //   errorMessage: "",
  //   successMessage: "",
  //   link: "",
  //   loading: false,
  // };

  constructor(props) {
    super(props);
    this.state = {
      minimumContribution: "",
      city: "",
      desc: "",
      ethaddress: "",
      errorMessage: "",
      successMessage: "",
      fileLink: "",
      loading: false,
    };
    this.setLink = this.setLink.bind(this);
  }

  setLink = (link) => {
    this.setState({ fileLink: link });
  };

  onSubmit = async (event) => {
    event.preventDefault();

    this.setState({ loading: true, errorMessage: "", successMessage: "" });

    try {
      const accounts = await web3.eth.getAccounts();

      console.log(this.state.fileLink);
      const link = this.state.fileLink ? this.state.fileLink : "0x0000000000000000";
      console.log("uploaded link: " + link);

      const approvercount = await approverfactory.methods.approvercount().call();
      const campaigncount = await campaignfactory.methods.campaigncount().call();
      const pos = campaigncount % approvercount;
      const approveraddress = await approverfactory.methods.approveraddress(pos).call();
      console.log(approveraddress);
      const addr = await approverfactory.methods.getstoreaddress(approveraddress).call();
      const approverInstance = ApproverInstance(addr);
      console.log(this.state.desc);

      await campaignfactory.methods
        .createcampaign(this.state.desc, this.state.city, this.state.minimumContribution, this.state.ethaddress, link)
        .send({ from: accounts[0] });

      await approverInstance.methods.insert_campaign_request(campaigncount).send({ from: accounts[0] });

      this.setState({
        successMessage: "Your request has been sent for verification",
      });
      // Router.pushRoute("/");
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false });
  };

  render() {
    return (
      <Layout>
        <h3 style={{ color: "#ffffff" }}>Create a Campaign</h3>

        <IPFSUpload setLink={this.setLink} />
        <h4 style={{ color: "#ffffff" }}>{this.state.fileLink ? "Status: Upload Successful" : "Status: No files uploaded"}</h4>

        <br />
        <br />

        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label style={{ color: "#ffffff" }}>Minimum Contribution</label>
            <Input
              label="wei"
              labelPosition="right"
              value={this.state.minimumContribution}
              onChange={(event) => this.setState({ minimumContribution: event.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <label style={{ color: "#ffffff" }}>Enter Description</label>
            <TextArea value={this.state.desc} onChange={(event) => this.setState({ desc: event.target.value })} />
          </Form.Field>
          <Form.Field>
            <label style={{ color: "#ffffff" }}>Target City</label>
            <Input value={this.state.city} onChange={(event) => this.setState({ city: event.target.value })} />
          </Form.Field>
          <Form.Field>
            <label style={{ color: "#ffffff" }}>Ethereum Address</label>
            <Input
              value={this.state.ethaddress}
              onChange={(event) => this.setState({ ethaddress: event.target.value })}
            />
          </Form.Field>

          <Button loading={this.state.loading} primary>
            Create Campaign!
          </Button>
        </Form>

        {this.state.errorMessage && <Message error header="Oops!" content={this.state.errorMessage} />}

        {this.state.successMessage && <Message success header="Congratulations!" content={this.state.successMessage} />}
      </Layout>
    );
  }
}

export default CampaignNew;

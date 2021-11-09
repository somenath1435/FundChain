import React, { Component } from "react";
import { Card, Grid, Button, Input, Message } from "semantic-ui-react";
import Layout from "../../components/layoutlogout";
import campaignfactory from "../../ethereum/campaigns";
import web3 from "../../ethereum/web3";
// import ContributeForm from "../../components/ContributeForm";
import { Link, Router } from "../../routes";

class RequestDetails extends Component {
  state = {
    campaignid: 0,
    requestid: 0,
    description: "",
    value: 0,
    recipient: "",
    status: false,
    approvalCount: 0,
    yescount: 0,
    errorMessage: "",
    successMessage: "",
  };

  static async getInitialProps(props) {
    const campaignid = props.query.campaignid;
    const requestid = props.query.requestid;

    return {
      campaignid: campaignid,
      requestid: requestid,
    };
  }

  async componentDidMount() {
    try {
      const campaignid = this.props.campaignid;
      const requestid = this.props.requestid;
      const accounts = await web3.eth.getAccounts();
      console.log("accounts[0] is " + accounts[0]);
      const req = await campaignfactory.methods.requests(requestid).call();
      console.log(req);
      const newvalue = web3.utils.fromWei(req.value, "ether")
      console.log(typeof req.value);
      console.log(req.value);
      this.setState({
        campaignid: req.campaignid,
        requestid: req.requestid,
        description: req.description,
        value: newvalue,
        recipient: req.recipient,
        status: req.status,
        approvalCount: req.approvalCount,
        yescount: req.yescount,
      });
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
  }

  renderCards() {
    let status;
    if (this.state.status === true) status = "Completed";
    if (this.state.status === false) status = "Pending";
    const items = [
      {
        description: this.state.campaignid,
        header: "Campaign Id",
        style: { overflowWrap: "break-word" },
      },
      {
        description: this.state.requestid,
        header: "Request Id",
        style: { overflowWrap: "break-word" },
      },
      {
        description: this.state.description,
        header: "Spend Request Desciption",
        style: { overflowWrap: "break-word" },
      },
      {
        description: this.state.recipient,
        header: "Recipient Ethereum Address",
        style: { overflowWrap: "break-word" },
      },
      {
        description: this.state.value,
        header: "Amount (ether)",
      },
      {
        description: this.state.approvalCount,
        header: "Total Votes",
      },
      {
        description: this.state.yescount,
        header: "Total Yes Votes",
      },
      {
        description: status,
        header: "Status",
      },
    ];

    return <Card.Group items={items} itemsPerRow="2" />;
  }

  render() {
    return (
      <Layout>
        <h3>Request Details</h3>
        <Grid>
          <Grid.Row>
            <Grid.Column>{this.renderCards()}</Grid.Column>
          </Grid.Row>
        </Grid>

        {this.state.errorMessage && <Message error header="Oops!" content={this.state.errorMessage} />}

        {this.state.successMessage && <Message success header="Congratulations!" content={this.state.successMessage} />}
      </Layout>
    );
  }
}

export default RequestDetails;

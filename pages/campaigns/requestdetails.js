import React, { Component } from "react";
import { Card, Grid, Button, Input, Message } from "semantic-ui-react";
import Layout from "../../components/layoutlogout";
import campaignfactory from "../../ethereum/campaigns";
import userfactory from "../../ethereum/factory_user";
import user from "../../ethereum/user";
import User1 from "../../ethereum/user";
import web3 from "../../ethereum/web3";
// import ContributeForm from "../../components/ContributeForm";
import { Link, Router } from "../../routes";

class RequestDetails extends Component {
  state = {
    campaignid: 0,
    requestid: 0,
    description: "",
    value: "",
    recipient: "",
    status: false,
    approvalCount: 0,
    yescount: 0,
    status_str: "",
    errorMessage: "",
    successMessage: "",
    isBacker: false,
    approveloading: false,
    rejectloading: false,
    votegiven: false,
    backerscount: 0,
    priority: 0,
    proposalhash: "",
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
      const newvalue = web3.utils.fromWei(req.value, "ether");

      const campaigndetails = await campaignfactory.methods.campaigns(campaignid).call();
      const backerscount = campaigndetails.backerscount;
      console.log("Backers Count: " + backerscount);

      this.setState({
        campaignid: req.campaignid,
        requestid: req.requestid,
        description: req.description,
        value: newvalue,
        recipient: req.recipient,
        status: req.status,
        approvalCount: req.approvalCount,
        yescount: req.yescount,
        status_str: req.status_str,
        proposalhash: req.proposalhash,
        backerscount: backerscount,
        priority: campaigndetails.priority,
      });

      const isBacker = await campaignfactory.methods.check_backer(campaignid, accounts[0]).call();
      this.setState({ isBacker: isBacker });
      if (isBacker === true) {
        console.log("This account is a Backer");
        const useraddr = await userfactory.methods.getstoreaddress(accounts[0]).call();
        const user1 = User1(useraddr);
        const pos = await user1.methods.getposition(requestid).call();
        const userreqstatus = await user1.methods.status_of_request(pos).call();
        if (userreqstatus === true) {
          this.setState({ votegiven: true });
          console.log("vote given");
        } else {
          console.log("vote not given");
        }
      }
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
        header: "Spend Request Description",
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
        description: this.state.status_str,
        header: "Spend Request Status",
      },
    ];

    return <Card.Group items={items} itemsPerRow="2" />;
  }

  onApprove = async () => {
    this.setState({ approveloading: true, errorMessage: "" });
    try {
      const accounts = await web3.eth.getAccounts();
      console.log("accounts[0] is " + accounts[0]);

      const campaignid = this.props.campaignid;
      const requestid = this.props.requestid;

      const useraddr = await userfactory.methods.getstoreaddress(accounts[0]).call();
      const user1 = User1(useraddr);

      await campaignfactory.methods.approve_spend_Request(requestid).send({ from: accounts[0] });

      await user1.methods.update_completed(requestid).send({ from: accounts[0] });

      // yes*100>totalbackers*x = success OR (totalvote-yes)*100>totalbackers*(100-x) = failure

      const backerscount = parseInt(this.state.backerscount);
      const yescount = parseInt(this.state.yescount) + 1;
      const totalvote = parseInt(this.state.approvalCount) + 1;
      const nocount = totalvote - yescount;
      let x = 100;
      const priority = parseInt(this.state.priority);
      if (priority === 0) x = 100;
      else if (priority === 1) x = 50;
      else if (priority === 2) x = 33;
      else if (priority === 3) x = 25;
      else if (priority === 4) x = 20;
      else if (priority === 5) x = 10;
      console.log(backerscount);
      console.log(yescount);
      console.log(totalvote);
      console.log(nocount);
      console.log(x);

      const status = this.state.status;
      if (!status) {
        //check for success and failure
        const isSuccess = yescount * 100 > backerscount * x;
        const isFailure = (totalvote - yescount) * 100 > backerscount * (100 - x);
        console.log("Lhs: " + yescount * 100);
        console.log("Rhs: " + backerscount * x);
        console.log("isSuccess: " + isSuccess);
        console.log("isFailure: " + isFailure);
        if (isSuccess) await campaignfactory.methods.finalize_spend_Request(requestid).send({ from: accounts[0] });
        if (isFailure) await campaignfactory.methods.disapprove_spend_Request(requestid).send({ from: accounts[0] });
      }

      this.setState({ successMessage: "Your Vote is successful" });
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    this.setState({ approveloading: false });
  };

  onReject = async () => {
    this.setState({ rejectloading: true, errorMessage: "" });
    try {
      const accounts = await web3.eth.getAccounts();
      console.log("accounts[0] is " + accounts[0]);

      const campaignid = this.props.campaignid;
      const requestid = this.props.requestid;

      const useraddr = await userfactory.methods.getstoreaddress(accounts[0]).call();
      const user1 = User1(useraddr);

      await campaignfactory.methods.reject_spend_Request(requestid).send({ from: accounts[0] });

      await user1.methods.update_completed(requestid).send({ from: accounts[0] });

      // yes*100>totalbackers*x = success OR (totalvote-yes)*100>totalbackers*(100-x) = failure

      const backerscount = parseInt(this.state.backerscount);
      const yescount = parseInt(this.state.yescount);
      const totalvote = parseInt(this.state.approvalCount) + 1;
      const nocount = totalvote - yescount;
      let x = 100;
      const priority = parseInt(this.state.priority);
      if (priority === 0) x = 100;
      else if (priority === 1) x = 50;
      else if (priority === 2) x = 33;
      else if (priority === 3) x = 25;
      else if (priority === 4) x = 20;
      else if (priority === 5) x = 10;
      console.log(backerscount);
      console.log(yescount);
      console.log(totalvote);
      console.log(nocount);
      console.log(x);

      const status = this.state.status;
      if (!status) {
        //check for success and failure
        const isSuccess = yescount * 100 > backerscount * x;
        const isFailure = (totalvote - yescount) * 100 > backerscount * (100 - x);
        console.log("Lhs: " + (totalvote - yescount) * 100);
        console.log("Rhs: " + backerscount * (100 - x));
        console.log("isSuccess: " + isSuccess);
        console.log("isFailure: " + isFailure);
        if (isSuccess) await campaignfactory.methods.finalize_spend_Request(requestid).send({ from: accounts[0] });
        if (isFailure) await campaignfactory.methods.disapprove_spend_Request(requestid).send({ from: accounts[0] });
      }

      this.setState({ successMessage: "Your Vote is successful" });
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    this.setState({ rejectloading: false });
  };

  showProposal = (e) => {
    e.preventDefault();
    try {
      window.open(this.state.proposalhash);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    // window.open("https://www.facebook.com/");
  };

  render() {
    return (
      <Layout>
        <h3>Request Details</h3>

        {this.state.proposalhash !== "0x0000000000000000" && (
          <Button primary floated="right" onClick={this.showProposal} content="Show Proposal" />
        )}
        <Grid>
          <Grid.Row>
            <Grid.Column>{this.renderCards()}</Grid.Column>
          </Grid.Row>
        </Grid>

        <br />
        {this.state.isBacker && !this.state.votegiven && <h3>Do you want to approve this Spend Request?</h3>}
        <br />

        {this.state.isBacker && !this.state.votegiven && (
          <Button negative onClick={this.onReject} loading={this.state.rejectloading}>
            No
          </Button>
        )}

        {this.state.isBacker && !this.state.votegiven && (
          <Button positive onClick={this.onApprove} loading={this.state.approveloading}>
            Yes
          </Button>
        )}

        {this.state.errorMessage && <Message error header="Oops!" content={this.state.errorMessage} />}

        {this.state.successMessage && <Message success header="Congratulations!" content={this.state.successMessage} />}
      </Layout>
    );
  }
}

export default RequestDetails;

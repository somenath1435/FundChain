import React, { Component } from "react";
import { Card, Grid, Button, Input, Message } from "semantic-ui-react";
import Layout from "../../components/layoutlogout";
import campaignfactory from "../../ethereum/campaigns";
import userfactory from "../../ethereum/factory_user";
import approverfactory from "../../ethereum/factory_approvers";
import User1 from "../../ethereum/user";
import ApproverInstance from "../../ethereum/approvers";
import web3 from "../../ethereum/web3";
// import ContributeForm from "../../components/ContributeForm";
import { Link, Router } from "../../routes";

class CampaignDetails extends Component {
  state = {
    requestcount: 0,
    requests: [],
    status: [],
    approveloading: false,
    rejectloading: false,
    contributeloading: false,
    errorMessage: "",
    priority: 0,
    type: "",
    currentaccount: "",
    isApprover: false,
    contributevalue: 0,
    successMessage: "",
  };

  static async getInitialProps(props) {
    const campaignid = props.query.campaignid;

    const campaign = await campaignfactory.methods.campaigns(campaignid).call();
    console.log(campaign);
    const status = await campaignfactory.methods.status_of_campaigns(campaignid).call();

    return {
      campaignid: campaignid,
      minimumContribution: campaign.minimumcontribution,
      managerid: campaign.managerid,
      status: status,
      description: campaign.description,
      targetcity: campaign.targetcity,
      typeofcampaign: campaign.typeofcampaign,
      priorityofcampaign: campaign.priority,
      approvedby: campaign.approvedby,
      proposalhash: campaign.typeofcampaign,
      backerscount: campaign.backerscount,
      totalmoney: campaign.totalmoney,
    };
  }

  async componentDidMount() {
    try {
      const accounts = await web3.eth.getAccounts();
      console.log("accounts[0] is " + accounts[0]);
      const checker = await approverfactory.methods.checker(accounts[0]).call();
      let flag = true;
      if (checker == false) flag = false;
      this.setState({ currentaccount: accounts[0], isApprover: flag });
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
  }

  renderCards() {
    const { campaignid, managerid, minimumContribution, status, description, targetcity } = this.props;

    const items = [
      {
        description: campaignid,
        header: "Campaign Id",
        style: { overflowWrap: "break-word" },
      },
      {
        description: description,
        header: "Campaign Desciption",
        style: { overflowWrap: "break-word" },
      },
      {
        description: minimumContribution,
        header: "Minimum Contribution (wei)",
      },
      {
        description: managerid,
        header: "Ethereum Address of Campaign Manager",
        style: { overflowWrap: "break-word" },
      },
      {
        description: targetcity,
        header: "Target City",
      },
      {
        description: status,
        header: "Status",
      },
    ];

    return <Card.Group items={items} />;
  }

  renderExtraCards() {
    const { typeofcampaign, priorityofcampaign, approvedby, backerscount, totalmoney } = this.props;

    const items = [
      {
        description: typeofcampaign,
        header: "Type of Campaign",
        style: { overflowWrap: "break-word" },
      },
      {
        description: approvedby,
        header: "Approved By",
        style: { overflowWrap: "break-word" },
      },
      {
        description: priorityofcampaign,
        header: "Priority",
      },
      {
        description: backerscount,
        header: "Backers Count",
      },
      {
        description: web3.utils.fromWei(totalmoney, "ether"),
        header: "Total Money (ether)",
      },
    ];

    return <Card.Group items={items} />;
  }

  onApprove = async () => {
    this.setState({ approveloading: true, errorMessage: "" });
    try {
      const type = this.state.type;
      const priority = this.state.priority;
      if (type === "" || priority === 0)
        this.setState({ errorMessage: "Enter Type of Campaign and Priority during approval" });
      else {
        //do api calls
        const accounts = await web3.eth.getAccounts();
        console.log("accounts[0] is " + accounts[0]);

        const campaignid = this.props.campaignid;

        await campaignfactory.methods
          .change_status_of_campaign(campaignid, "Approved", priority, accounts[0], type)
          .send({ from: accounts[0] });

        const approveraddr = await approverfactory.methods.getstoreaddress(accounts[0]).call();
        console.log(approveraddr);
        const approverInstance = ApproverInstance(approveraddr);
        await approverInstance.methods.update_status(campaignid).send({ from: accounts[0] });

        const useraddr = await userfactory.methods.getstoreaddress(this.props.managerid).call();
        console.log(useraddr);
        const user1 = User1(useraddr);
        await user1.methods.insert_created_campaign(campaignid).send({ from: accounts[0] });

        Router.replaceRoute(`/approver/${accounts[0]}`);
      }
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

      await campaignfactory.methods
        .change_status_of_campaign(campaignid, "Rejected", 0, accounts[0], "Unknown")
        .send({ from: accounts[0] });

      const approveraddr = await approverfactory.methods.getstoreaddress(accounts[0]).call();
      console.log(approveraddr);
      const approverInstance = ApproverInstance(approveraddr);
      await approverInstance.methods.update_status(campaignid).send({ from: accounts[0] });

      const useraddr = await userfactory.methods.getstoreaddress(this.props.managerid).call();
      console.log(useraddr);
      const user1 = User1(useraddr);
      await user1.methods.insert_rejected_campaign(campaignid).send({ from: accounts[0] });

      Router.replaceRoute(`/approver/${accounts[0]}`);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    this.setState({ rejectloading: false });
  };

  contribute = async (event) => {
    event.preventDefault();
    this.setState({ contributeloading: true, errorMessage: "", successMessage: "" });
    try {
      const acc = this.state.currentaccount;
      const campaignid = this.props.campaignid;

      await campaignfactory.methods
        .contribute(campaignid)
        .send({ from: acc, value: web3.utils.toWei(this.state.contributevalue, "ether") });

      const useraddr = await userfactory.methods.getstoreaddress(acc).call();
      console.log(useraddr);
      const user1 = User1(useraddr);
      await user1.methods.insert_contributed_campaign(campaignid).send({ from: acc });

      this.setState({ successMessage: "Your Contribution was successful" });
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    this.setState({ contributeloading: false, contributevalue: 0 });
  };

  render() {
    const isPending = this.props.status === "Pending";
    const isApproved = this.props.status === "Approved";
    const isRejected = this.props.status === "Rejected";
    const isOwner = this.props.managerid === this.state.currentaccount;
    const isExtra = isOwner || isApproved;
    const isApprover = this.state.isApprover;
    const canContribute = !isApprover && isApproved;
    return (
      <Layout>
        <h3>Campaign Details</h3>
        <Grid>
          <Grid.Row>
            <Grid.Column>{this.renderCards()}</Grid.Column>

            {/* <Grid.Column width={6}>
              <ContributeForm address={this.props.address} />
            </Grid.Column> */}
          </Grid.Row>

          {isExtra && (
            <Grid.Row>
              <Grid.Column>{this.renderExtraCards()}</Grid.Column>
            </Grid.Row>
          )}

          {/* <Grid.Row>
            <Grid.Column>
              <Link route={`/campaigns/${this.props.address}/requests`}>
                <a>
                  <Button primary>View Requests</Button>
                </a>
              </Link>
            </Grid.Column>
          </Grid.Row> */}
        </Grid>

        <br />
        <br />

        {isPending && (
          <Button negative onClick={this.onReject} disabled={!isPending} loading={this.state.rejectloading}>
            Reject Request
          </Button>
        )}

        {isPending && (
          <Button positive onClick={this.onApprove} disabled={!isPending} loading={this.state.approveloading}>
            Approve Request
          </Button>
        )}

        <br />
        <br />

        {isPending && (
          <Input
            placeholder="Enter Priority (1-5) during approval"
            disabled={!isPending}
            fluid={true}
            onChange={(event) => this.setState({ priority: event.target.value })}
          />
        )}

        <br />

        {isPending && (
          <Input
            value={this.state.type}
            placeholder="Enter Type of Campaign during approval"
            disabled={!isPending}
            fluid={true}
            onChange={(event) => this.setState({ type: event.target.value })}
          />
        )}

        <br />
        <br />

        {canContribute && (
          <Input
            placeholder="Enter Amount to contribute to this campaign"
            label="ether"
            labelPosition="right"
            onChange={(event) => this.setState({ contributevalue: event.target.value })}
          />
        )}

        {canContribute && (
          <Button color="violet" onClick={this.contribute} loading={this.state.contributeloading}>
            Contribute!
          </Button>
        )}

        <br />
        <br />

        {isOwner && (
          <Link route={`/campaigns/${this.props.campaignid}/newrequest`}>
            <a>
              <Button content="Create Spend Request!" color="facebook" />
            </a>
          </Link>
        )}

        {this.state.errorMessage && <Message error header="Oops!" content={this.state.errorMessage} />}

        {this.state.successMessage && <Message success header="Congratulations!" content={this.state.successMessage} />}
      </Layout>
    );
  }
}

export default CampaignDetails;

import React, { Component } from "react";
import { Card, Button, Form, Input, Message, List } from "semantic-ui-react";
import Layout from "../../components/layoutlogout";
import { Link, Router } from "../../routes";
import web3 from "../../ethereum/web3";
import campaignfactory from "../../ethereum/campaigns";

class PendingRequest extends Component {
  state = {
    requestcount: 0,
    requests: [],
    status: [],
  };

  static async getInitialProps(props) {
    const campaignid = props.query.campaignid;
    return { campaignid };
  }

  async componentDidMount() {
    try {
      const campaignid = this.props.campaignid;
      const count = await campaignfactory.methods.requestlist_size(campaignid).call();
      const requestlist = await campaignfactory.methods.get_requestlist(campaignid).call();

      let arr = [];
      let len = 0;
      for (let i = 0; i < count; i++) {
        const requestid = requestlist[i];
        const req = await campaignfactory.methods.requests(requestid).call();
        if (req.status === false) {
          arr.push(req);
          len++;
        }
      }
      this.setState({ requests: arr, requestcount: len });
    } catch (err) {
      console.log(err);
    }
  }

  showDetails(e, reqid) {
    e.preventDefault();
    console.log(reqid);
    Router.pushRoute(`/campaigns/${this.props.campaignid}/request/${reqid}`);
  }

  displayRequests() {
    const items = this.state.requests.map((req, index) => {
      const headers = (
        <List>
          <List.Item>Campaign Id: {req.campaignid}</List.Item>
          <List.Item>Request Id: {req.requestid}</List.Item>
          <List.Item>Amount: {req.value}</List.Item>
          <List.Item>Status: Pending</List.Item>
          <Button primary floated="right" onClick={(e) => this.showDetails(e, req.requestid)}>
            Show Details
          </Button>
        </List>
      );

      return {
        key: index,
        header: headers,
        fluid: true,
      };
    });

    return <Card.Group items={items} itemsPerRow="2" />;
  }

  render() {
    return (
      <Layout>
        <div>
          <h1>Pending spend requests will be shown here!</h1>
          <h3>{this.state.requestcount} Pending Spend Requests found</h3>

          {this.displayRequests()}
        </div>
      </Layout>
    );
  }
}

export default PendingRequest;

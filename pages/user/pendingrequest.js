import React, { Component } from "react";
import { Card, Button, Form, Input, Message, List } from "semantic-ui-react";
import Layout from "../../components/layoutlogout";
import { Link, Router } from "../../routes";
import web3 from "../../ethereum/web3";
import campaignfactory from "../../ethereum/campaigns";
import User1 from "../../ethereum/user";
import userfactory from "../../ethereum/factory_user";

class PendingRequest extends Component {
  state = {
    requestcount: 0,
    requests: [],
  };

  static async getInitialProps(props) {
    const address = props.query.address;
    return { address };
  }

  async componentDidMount() {
    try {
      const addr = await userfactory.methods.getstoreaddress(this.props.address).call();
      const user1 = User1(addr);
      const count = await user1.methods.requestcount().call();
      console.log(count);

      let arr = [];
      let len = 0;
      for (let i = 0; i < count; i++) {
        const requestid = await user1.methods.requests(i).call();
        const status = await user1.methods.status_of_request(i).call();
        if (status === false) {
          const req = await campaignfactory.methods.requests(requestid).call();
          arr.push(req);
          len++;
        }
      }
      this.setState({ requests: arr, requestcount: len });
    } catch (err) {
      console.log(err);
    }
  }

  showDetails(e, reqid, campaignid) {
    e.preventDefault();
    console.log(reqid);
    Router.pushRoute(`/campaigns/${campaignid}/request/${reqid}`);
  }

  displayRequests() {
    const items = this.state.requests.map((req, index) => {
      const headers = (
        <List>
          <List.Item>Campaign Id: {req.campaignid}</List.Item>
          <List.Item>Request Id: {req.requestid}</List.Item>
          <List.Item>Amount: {web3.utils.fromWei(req.value, "ether")}</List.Item>
          <List.Item>Status: Pending</List.Item>
          <Button primary floated="right" onClick={(e) => this.showDetails(e, req.requestid, req.campaignid)}>
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

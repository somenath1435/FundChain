import React, { Component } from "react";
import { Card, Button, Form, Input, Message, List } from "semantic-ui-react";
import Layout from "../../components/layoutlogout";
import { Link, Router } from "../../routes";
import web3 from "../../ethereum/web3";
import campaignfactory from "../../ethereum/campaigns";
import User1 from "../../ethereum/user";
import userfactory from "../../ethereum/factory_user";

class CompletedRequest extends Component {
  state = {
    requestcount: 0,
    requests: [],
    status: [],
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

      let arr = [];
      let len = 0;
      for (let i = 0; i < count; i++) {
        const requestid = await user1.methods.requests(i).call();
        const status = await user1.methods.status_of_request(i).call();
        if (status === true) {
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
          <List.Item>Status: Not Pending</List.Item>
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
          <h1 style={{ color: "#ffffff" }}>Completed spend requests will be shown here!</h1>
          <h3 style={{ color: "#ffffff" }}>{this.state.requestcount} Completed Spend Requests found</h3>

          {this.displayRequests()}
        </div>
      </Layout>
    );
  }
}

export default CompletedRequest;

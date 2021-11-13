import React, { Component } from "react";
import { Card, Button, Form, Input, Message, List } from "semantic-ui-react";
import Layout from "../../components/layoutlogout";
import { Link, Router } from "../../routes";
import web3 from "../../ethereum/web3";
import factory from "../../ethereum/factory_approvers";
import ApproverInstance from "../../ethereum/approvers";

class AllRequest extends Component {
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
      const addr = await factory.methods.getstoreaddress(this.props.address).call();
      console.log(addr);
      const approverInstance = ApproverInstance(addr);
      const count = await approverInstance.methods.requestcount().call();

      this.setState({ requestcount: count });
      let arr = [];
      let statusarr = [];
      for (let i = 0; i < count; i++) {
        const campaignid = await approverInstance.methods.campaign_request(i).call();
        const statusbool = await approverInstance.methods.status(i).call();
        if (statusbool === false) statusarr.push("Pending");
        else statusarr.push("Not Pending");
        arr.push(campaignid);
        console.log(campaignid);
        console.log(statusarr[i]);
      }
      this.setState({ requests: arr, status: statusarr });
    } catch (err) {
      console.log(err);
    }
  }

  showDetails(e, id) {
    e.preventDefault();
    console.log(id);
    Router.pushRoute(`/campaigns/${id}`);
  }

  displayRequests() {
    const statusarr = this.state.status;
    const items = this.state.requests.map((id, index) => {
      const headers = (
        <List>
          <List.Item>Campaign Id: {id}</List.Item>
          <List.Item>Status: {statusarr[index]}</List.Item>
          <Button primary floated="right" onClick={(e) => this.showDetails(e, id)}>
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
          <h1 style={{ color: "#ffffff" }}>All campaign requests will be shown here!</h1>
          <h3 style={{ color: "#ffffff" }}>
            {this.state.requestcount} Campaign Requests found for Approver {this.props.address}
          </h3>

          {this.displayRequests()}
        </div>
      </Layout>
    );
  }
}

export default AllRequest;

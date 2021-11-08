import React, { Component } from "react";
import { Card, Message, Button, List } from "semantic-ui-react";
import Layout from "../../components/layoutlogout";
import User1 from "../../ethereum/user";
import factory from "../../ethereum/campaigns";
import { Link, Router } from "../../routes";

class AllCampaigns extends Component {
  state = {
    errorMessage: "",
    campaigncount: 0,
    campaigns: [],
  };

  async componentDidMount() {
    try {
      const count = await factory.methods.campaigncount().call();

      let arr = [];
      let len = 0;
      for (let i = 0; i < count; i++) {
        const status = await factory.methods.status_of_campaigns(i).call();
        if (status === "Approved") {
          arr.push(i);
          len++;
        }
      }
      this.setState({ campaigns: arr, campaigncount: len });
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
  }

  showDetails(e, id) {
    e.preventDefault();
    console.log(id);
    Router.pushRoute(`/campaigns/${id}`);
  }

  displayRequests() {
    const items = this.state.campaigns.map((id, index) => {
      const headers = (
        <List>
          <List.Item>Campaign Id: {id}</List.Item>
          <List.Item>Status: Approved</List.Item>
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
          <h2>
            {this.state.campaigncount} Public campaigns found
          </h2>

          {this.displayRequests()}

          {this.state.errorMessage && <Message error header="Oops!" content={this.state.errorMessage} />}

          <br />
          <br />
        </div>
      </Layout>
    );
  }
}

export default AllCampaigns;

import React, { Component } from "react";
import { Card, Message, Button, List } from "semantic-ui-react";
import Layout from "../../components/layoutlogout";
import User1 from "../../ethereum/user";
import factory from "../../ethereum/factory_user";
import { Link, Router } from "../../routes";

class ApprovedCampaigns extends Component {
  state = {
    errorMessage: "",
    created_campaigns_count: 0,
    campaigns: [],
  };

  static async getInitialProps(props) {
    //call api
    const address = props.query.address;
    return { address };
  }

  async componentDidMount() {
    try {
      const addr = await factory.methods.getstoreaddress(this.props.address).call();

      console.log(addr);
      const user1 = User1(addr);
      const count = await user1.methods.created_campaigns_count().call();
      this.setState({ created_campaigns_count: count });

      let arr = [];
      for (let i = 0; i < count; i++) {
        const campaignid = await user1.methods.created_campaigns(i).call();
        arr.push(campaignid);
      }
      this.setState({ campaigns: arr });
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
          <h2 style={{ color: "#ffffff" }}>
            {this.state.created_campaigns_count} Approved campaigns found for user {this.props.address}
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

export default ApprovedCampaigns;

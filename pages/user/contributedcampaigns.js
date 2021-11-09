import React, { Component } from "react";
import { Card, Message, Button, List } from "semantic-ui-react";
import Layout from "../../components/layoutlogout";
import User1 from "../../ethereum/user";
import factory from "../../ethereum/factory_user";
import campaignfactory from "../../ethereum/campaigns";
import { Link, Router } from "../../routes";

class ContributedCampaigns extends Component {
  state = {
    errorMessage: "",
    contributed_campaigns_count: 0,
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
      const count = await user1.methods.contributed_campaigns_count().call();
      this.setState({ contributed_campaigns_count: count });

      let arr = [];
      for (let i = 0; i < count; i++) {
        const campaignid = await user1.methods.contributed_campaigns(i).call();
        const campaigndetail = await campaignfactory.methods.campaigns(campaignid).call();
        arr.push(campaigndetail);
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
    const items = this.state.campaigns.map((campaign, index) => {
      const headers = (
        <List>
          <List.Item>Campaign Id: {campaign.campaignid}</List.Item>
          <List.Item>Target City: {campaign.targetcity}</List.Item>
          <List.Item>Campaign Type: {campaign.typeofcampaign}</List.Item>
          <List.Item>Priority: {campaign.priority}</List.Item>
          <Button primary floated="right" onClick={(e) => this.showDetails(e, campaign.campaignid)}>
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
            {this.state.contributed_campaigns_count} contributed campaigns found for user {this.props.address}
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

export default ContributedCampaigns;

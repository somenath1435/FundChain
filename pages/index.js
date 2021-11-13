import React, { Component } from "react";
import { Card, Button, Segment, Grid, Form, Divider } from "semantic-ui-react";
// import factory from '../ethereum/factory';
import Layout from "../components/Layout";
import IPFSUpload from "../components/IPFSUpload";
import { Link } from "../routes";
import { Header } from "semantic-ui-react";

class CampaignIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileLink: "",
    };
    this.setLink = this.setLink.bind(this);
  }
  // static async getInitialProps() {
  //   // const campaigns = await factory.methods.getDeployedCampaigns().call();

  //   // return { campaigns };
  // }
  setLink(link) {
    this.setState({ fileLink: link });
  }

  renderCampaigns() {
    const items = this.props.campaigns.map((address) => {
      return {
        header: address,
        description: (
          <Link route={`/campaigns/${address}`}>
            <a>View Campaign</a>
          </Link>
        ),
        fluid: true,
      };
    });

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <Header style={{
          textAlign: "center",
          fontSize: "100px",
          fontWeight: "bold",
          letterSpacing: "30px",
          padding: "100px 0 0 0",
          color: "#fff"
        }}>FundChain</Header>
        <Header style={{
          textAlign: "center",
          fontSize: "40px",
          fontWeight: "bold",
          letterSpacing: "3px",
          lineHeight: "10px",
          padding: "40px 0 40px 0",
          color: "#fff"
        }}> Transparent Fundraising Platform</Header>
        <Segment placeholder style={{padding: "20px"}}>
          <Grid columns={2} relaxed='very' stackable>
            <Grid.Column>
              <Link route="/register">
                <Button primary content="Register" />
              </Link>
            </Grid.Column>
            <Grid.Column verticalAlign='middle'>
              <Link route="/login">
                <Button primary content="Login" />
              </Link>
            </Grid.Column>
          </Grid>

          <Divider vertical>Or</Divider>
        </Segment>
      </Layout>
    );
  }
}

export default CampaignIndex;

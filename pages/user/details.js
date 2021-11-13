import React, { Component } from "react";
import { Link } from "../../routes";
import { Card, Message, Button, Header, Icon, Accordion, Segment } from "semantic-ui-react";
import Layout from "../../components/layoutlogout";
import User1 from "../../ethereum/user";
import factory from "../../ethereum/factory_user";

class UserDetails extends Component {
  state = {
    fname: "",
    lname: "",
    phone: "",
    adhaar: "",
    email: "",
    eth: "",
    errorMessage: "",
    currentChoice: 0,
    activeIndex: 0,
  };

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  static async getInitialProps(props) {
    //call api
    const add = props.query.address;
    return { add };
  }

  async componentDidMount() {
    try {
      const addr = await factory.methods.getstoreaddress(this.props.add).call();

      console.log(addr);
      const user1 = User1(addr);
      const summary = await user1.methods.showdetails().call();
      console.log(summary);

      this.setState({
        fname: summary[0],
        lname: summary[1],
        phone: summary[2],
        adhaar: summary[3],
        eth: summary[4],
        email: summary[5],
      });
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
  }

  renderCampaigns() {
    //replace data here
    const items = [
      {
        header: "Address",
        description: this.props.add,
        style: {
          border: "2px solid white!important",
          overflowWrap: "break-word",
        },
      },
      {
        header: "First Name",
        description: this.state.fname,
        style: {
          border: "2px solid white!important",
          overflowWrap: "break-word",
        },
      },
      {
        header: "Last Name",
        description: this.state.lname,
        style: {
          border: "2px solid white!important",
          overflowWrap: "break-word",
        },
      },
      {
        header: "Phone Number",
        description: this.state.phone,
        style: {
          border: "2px solid white!important",
          overflowWrap: "break-word",
        },
      },
      {
        header: "Adhaar Number",
        description: this.state.adhaar,
        style: {
          border: "2px solid white!important",
          overflowWrap: "break-word",
        },
      },
      {
        header: "Email",
        description: this.state.email,
        style: {
          border: "2px solid white!important",
          overflowWrap: "break-word",
        },
      },
    ];

    return <Card.Group items={items} />;
  }

  render() {
    const { activeIndex } = this.state;

    return (
      <Layout>
        <div>
          <Header size="large" style={{color : "#ffffff"}}>User Details</Header>

          {this.renderCampaigns()}

          {this.state.errorMessage && <Message error header="Oops!" content={this.state.errorMessage} />}

          <Segment >
            <Accordion>
              <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
                <Icon name="dropdown" />
                Campaigns
              </Accordion.Title>
              <Accordion.Content active={activeIndex === 0}>
                <Button.Group>
                  <Link route={`/campaigns/newcampaign`}>
                    <Button color="violet" content="Create New Campaign" />
                  </Link>
                  <Button.Or />
                  <Link route={`/user/${this.props.add}/approvedcampaigns`}>
                    <Button color="violet" content="My Approved Campaigns" />
                  </Link>
                  <Button.Or />

                  <Link route={`/user/${this.props.add}/rejectedcampaigns`}>
                    <Button color="violet" content="My Rejected Campaigns" />
                  </Link>
                  <Button.Or />

                  <Link route={`/campaigns/allcampaign`}>
                    <Button color="violet" content="View Public Campaigns" />
                  </Link>
                  <Button.Or />
                  <Link route={`/user/${this.props.add}/contributedcampaigns`}>
                    <Button color="violet" content="My Contributed Campaigns" />
                  </Link>
                </Button.Group>
              </Accordion.Content>

              <Accordion.Title active={activeIndex === 1} index={1} onClick={this.handleClick}>
                <Icon name="dropdown" />
                Requests
              </Accordion.Title>
              <Accordion.Content active={activeIndex === 1}>
                <Button.Group style={{ margin: "20px 0 0 0" }}>
                  <Link route={`/user/${this.props.add}/pendingrequest`}>
                    <Button color="violet" content="View Pending Spend Requests" primary />
                  </Link>
                  <Button.Or />
                  <Link route={`/user/${this.props.add}/completedrequest`}>
                    <Button color="violet" content="View Completed Spend Requests" primary />
                  </Link>
                </Button.Group>
              </Accordion.Content>
            </Accordion>
          </Segment>
        </div>
      </Layout>
    );
  }
}

export default UserDetails;

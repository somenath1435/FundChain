import React, { Component } from "react"
import { Link } from '../../routes';
import { Card, Message, Button, Header } from "semantic-ui-react";
import Layout from "../../components/layoutlogout";
import User1 from "../../ethereum/user";
import factory from "../../ethereum/factory_user";
import NewCampaign from "../campaigns/newcampaign";
import ApprovedCampaigns from './approvedcampaigns';
import RejectedCampaigns from './rejectedcampaigns';
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
          overflowWrap: "break-word"
        }
      },
      {
        header: "First Name",
        description: this.state.fname,
        style: {
          border: "2px solid white!important",
          overflowWrap: "break-word"
        }
      },
      {
        header: "Last Name",
        description: this.state.lname,
        style: {
          border: "2px solid white!important",
          overflowWrap: "break-word"
        }
      },
      {
        header: "Phone Number",
        description: this.state.phone,
        style: {
          border: "2px solid white!important",
          overflowWrap: "break-word"
        }
      },
      {
        header: "Adhaar Number",
        description: this.state.adhaar,
        style: {
          border: "2px solid white!important",
          overflowWrap: "break-word"
        }
      },
      {
        header: "Email",
        description: this.state.email,
        style: {
          border: "2px solid white!important",
          overflowWrap: "break-word"
        } 
      },
    ];

    return <Card.Group style={{}} items={items} />;
  }
  getCampaignType(index) {
    const typeComponent = [<NewCampaign />, <ApprovedCampaigns />, <RejectedCampaigns />];

    return typeComponent[index]
  }

  render() {
    const btns = ["Create New Campaign", "My Approved Campaigns", "My Rejected Campaigns", "View Public Campaigns", "My Contributed Campaigns", "View Pending Spend Requests", "View Completed Spend Requests"];
    return (
      <Layout>
        <div>
          <Header size="large">User Details</Header>

          {this.renderCampaigns()}

          {this.state.errorMessage && <Message error header="Oops!" content={this.state.errorMessage} />}

          <br />
          <br />
          <Button.Group>
            <Link route={`/campaigns/newcampaign`}>
              <a>
                <Button color="violet" content="Create New Campaign" primary />
              </a>
            </Link>

            <Link route={`/user/${this.props.add}/approvedcampaigns`}>
              <a>
                <Button color="violet" content="My Approved Campaigns" primary />
              </a>
            </Link>

            <Link route={`/user/${this.props.add}/rejectedcampaigns`}>
              <a>
                <Button color="violet" content="My Rejected Campaigns" primary />
              </a>
            </Link>

            <Link route={`/campaigns/allcampaign`}>
              <a>
                <Button color="violet" content="View Public Campaigns" primary />
              </a>
            </Link>
          </Button.Group>
          <Button.Group style={{margin: "20px 0 0 0"}}>

          <Link route={`/user/${this.props.add}/contributedcampaigns`}>
              <a>
                <Button color="violet" content="My Contributed Campaigns" primary />
              </a>
            </Link>

            <Link route={`/user/${this.props.add}/pendingrequest`}>
              <a>
                <Button color="violet" content="View Pending Spend Requests" primary />
              </a>
            </Link>

            <Link route={`/user/${this.props.add}/completedrequest`}>
              <a>
                <Button color="violet" content="View Completed Spend Requests" primary />
              </a>
            </Link>
          </Button.Group>

        </div>
      </Layout>
    );
  }
}

export default UserDetails;

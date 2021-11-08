import React, { Component } from "react";
import { Card, Message, Button } from "semantic-ui-react";
import Layout from "../../components/layoutlogout";
import ApproverInstance from "../../ethereum/approvers";
import factory from "../../ethereum/factory_approvers";
import { Link } from "../../routes";

class ApproverDetails extends Component {
  state = {
    fname: "",
    lname: "",
    phone: "",
    organisation: "",
    email: "",
    eth: "",
    errorMessage: "",
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
      const approverInstance = ApproverInstance(addr);
      const summary = await approverInstance.methods.showdetails().call();
      console.log(summary);

      this.setState({
        fname: summary[0],
        lname: summary[1],
        phone: summary[2],
        organisation: summary[3],
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
        header: "First Name",
        description: this.state.fname,
      },
      {
        header: "Last Name",
        description: this.state.lname,
      },
      {
        header: "Phone Number",
        description: this.state.phone,
      },
      {
        header: "Organisation",
        description: this.state.organisation,
      },
      {
        header: "Email",
        description: this.state.email,
      },
    ];

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <div>
          <h3>Approver Details for address {this.props.add}</h3>

          {this.renderCampaigns()}

          {this.state.errorMessage && <Message error header="Oops!" content={this.state.errorMessage} />}

          <br />
          <br />
          <Link route={`/approver/${this.props.add}/allrequest`}>
            <a>
              <Button content="View all campaign requests" primary />
            </a>
          </Link>
          <br />
          <br />
          <Link route={`/approver/${this.props.add}/pendingrequest`}>
            <a>
              <Button content="View pending campaign requests" primary />
            </a>
          </Link>
        </div>
      </Layout>
    );
  }
}

export default ApproverDetails;

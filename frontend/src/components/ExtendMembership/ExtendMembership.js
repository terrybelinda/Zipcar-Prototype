import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { Grid, Row, Col } from "react-bootstrap";
import axios from "axios";
import moment from "moment";

class ExtendMembership extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_info: [],
      selection: "",
    };
  }

  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo = () => {
    axios.defaults.headers.common["x-auth-token"] = localStorage.getItem(
      "token"
    );
    axios
      .get(
        "http://localhost:8080/api/viewuserbyemail?email=" +
          localStorage.getItem("email")
      )
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          if (res.data) {
            console.log(res.data);
            this.setState({ user_info: res.data });
          }
        }
      })
      .catch((err) => {});
  };

  submitHandler = (event) => {
    if (this.state.selection != "") {
      event.preventDefault();
      const data = {
        email: this.state.user_info.email,
        months: this.state.selection,
      };

      axios
        .post("http://localhost:8080/api/extendmembership", data)
        .then((res) => {
          console.log(res.status);
          if (res.status === 200) {
            console.log(this.state.user_info.cardNumber);
            const lastFour = this.state.user_info.cardNumber;
            alert("Success! Amount" + +"debited has been debited");
          }
        })
        .catch((err) => {
          console.log(err);
          this.props.authFail(err.response.data.msg);
        });
    } else {
      alert("Please select an option");
    }
  };

  render() {
    return (
      <Container className="m-5 d-flex justify-content-center">
        <Form>
          <div>
            <h1> Hello {this.state.user_info.name},</h1>
          </div>
          <br></br>
          <div>
            <h1>
              Your membership ends on{" "}
              <font color="green">
                {this.state.user_info.membershipEndDate}
              </font>
            </h1>
            <h2>Would you like to extend it ?</h2>
          </div>
          <br></br>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridMobile">
              <Form.Check
                type="radio"
                value="6"
                label="6 months membership"
                checked={this.state.selection == 6}
                onChange={(event) =>
                  this.setState({
                    selection: 6,
                  })
                }
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridDOB">
              <Form.Check
                type="radio"
                value="12"
                label="12 months membership"
                checked={this.state.selection == 12}
                onChange={(event) =>
                  this.setState({
                    selection: 12,
                  })
                }
              />
            </Form.Group>
          </Form.Row>

          <Button variant="primary" type="submit" onClick={this.submitHandler}>
            Extend
          </Button>
        </Form>
      </Container>
    );
  }
}
export default ExtendMembership;

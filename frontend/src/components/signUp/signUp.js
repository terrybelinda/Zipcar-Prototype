import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import { Grid, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { UsaStates as usaStates } from "usa-states";
class SignUp extends Component {
  buildOptionsStates() {
    var usStates = new usaStates();
    var arr = [];
    usStates.states.forEach(function(entry) {
      arr.push(<option>{entry["abbreviation"]}</option>);
    });
    return arr;
  }
  render() {
    return (
      <Container className="m-5 d-flex justify-content-center">
        <Form>
          <Form.Group controlId="formGridName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="name" placeholder="Enter name" />
          </Form.Group>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridMobile">
              <Form.Label>Mobile</Form.Label>
              <Form.Control placeholder="+1xxxxxxxxxx" />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridDOB">
              <Form.Label>DOB</Form.Label>
              <Form.Control type="date" placeholder="Enter date of birth" />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridApartment">
              <Form.Label>Apartment #</Form.Label>
              <Form.Control placeholder="Apartment" />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridStreet">
              <Form.Label>Street</Form.Label>
              <Form.Control placeholder="Street" />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>City</Form.Label>
              <Form.Control />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>State</Form.Label>
              <Form.Control as="select" value="Choose">
                <option>Choose</option>
                {this.buildOptionsStates()}
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label>Zip</Form.Label>
              <Form.Control />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridLicenseState">
              <Form.Label>Licence state</Form.Label>
              <Form.Control as="select" value="Choose">
                <option>Choose</option>
                {this.buildOptionsStates()}
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridLicenseId">
              <Form.Label>License #</Form.Label>
              <Form.Control placeholder="License #" />
            </Form.Group>
          </Form.Row>
          <Form.Group controlId="formGridcc#">
            <Form.Label>Credit Card #</Form.Label>
            <Form.Control placeholder="Enter 16 digit credit card number" />
          </Form.Group>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridMonth">
              <Form.Label>Month</Form.Label>
              <Form.Control />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridYear">
              <Form.Label>Year</Form.Label>
              <Form.Control />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridCvv">
              <Form.Label>cvv</Form.Label>
              <Form.Control />
            </Form.Group>
          </Form.Row>
          your information
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    );
  }
}

export default SignUp;

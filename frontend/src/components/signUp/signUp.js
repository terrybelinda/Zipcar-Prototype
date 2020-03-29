import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import { Grid, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
class SignUp extends Component {
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
              <Form.Control placeholder="Enter date of birth" />
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
              <Form.Control as="select" value="Choose...">
                <option>Choose...</option>
                <option>...</option>
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
              <Form.Control as="select" value="Choose...">
                <option>Choose...</option>
                <option>...</option>
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridLicenseId">
              <Form.Label>License ID</Form.Label>
              <Form.Control placeholder="License ID" />
            </Form.Group>
          </Form.Row>

          <Form.Group id="formGridCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    );
  }
}
export default SignUp;

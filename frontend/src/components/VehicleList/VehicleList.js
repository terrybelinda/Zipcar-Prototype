import React from "react";
import {
  Container,
  Card,
  Row,
  Col,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import { useRef, useState, Component } from "react";
import axios from "axios";
import { Icon } from "semantic-ui-react";

class VehicleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requiredItem: 0,
      type: [],
      show: false,
    };
    this.saveModalDetails = this.saveModalDetails.bind(this);
  }
  componentDidMount() {
    this.getVehicles();
  }

  getVehicles = () => {
    axios.defaults.headers.common["x-auth-token"] = localStorage.getItem(
      "token"
    );
    axios
      .get("http://localhost:8080/api/allvehicles")
      .then((res) => {
        if (res.status == 200) {
          if (res.data) {
            console.log(res.data);
            this.setState({ type: res.data });
          }
        }
      })
      .catch((err) => {});
  };
  removeItem(item) {
    const newItems = this.state.type.filter((type) => {
      return type !== item;
    });
    this.setState({
      type: [...newItems],
    });
  }

  showModal = (key) => {
    this.setState({ show: true });
    this.setState({
      requiredItem: key,
    });
  };

  hideModal = () => {
    this.setState({ show: false, type: this.state.type });
  };

  saveModalDetails(e) {
    const requiredItem = this.state.requiredItem;
    let temptype = this.state.type;
    temptype[requiredItem].vehicle_type = e.target.elements[0].value;
    this.setState({ type: temptype });
    this.setState({ show: false });
  }

  render() {
    const list = this.state.type.map((item, index) => (
      <Col sm="3">
        <Card
          bg="light"
          //style={{ width: "18rem" }}
          className="mt-2 border border-primary"
          key={item.id}
        >
          <Card.Img variant="top" src={require("./Capture.PNG")} />
          <Card.Header as="h5">
            licence #: {item.license_no}
            Make: {item.make}
            Model: {item.model}
          </Card.Header>

          <Card.Body>
            <Card.Text id="year"> Year :{item.year}</Card.Text>
            Status:
            {item.status == 0 ? (
              <Button disabled size="sm" variant="success">
                Active
              </Button>
            ) : (
              <Button disabled size="sm" variant="danger">
                Inactive
              </Button>
            )}
            <Card.Text id="regisration_expiry">
              <b>Registration Expiry:</b> {item.regisration_expiry}
            </Card.Text>
            <Card.Text id="vid">
              <b>Vehicle ID: </b> {item.vid}
            </Card.Text>
            <Card.Text id="current_mileage">
              <b>Miles:</b> {item.current_mileage}
            </Card.Text>
            <Card.Text id="condition">Condition: {item.condition}</Card.Text>
            <Card.Text id="vehicle_type">
              <b>vehicle type:</b>
              {item.vehicle_type}
            </Card.Text>
            <Card.Text id="rental_location">
              <b>Rental Location:</b>
              {item.rental_location}
            </Card.Text>
            <Card.Link href="#" onClick={() => this.showModal(index)}>
              Edit
            </Card.Link>
            <Card.Link href="#" onClick={() => this.removeItem(item)}>
              Delete
            </Card.Link>
          </Card.Body>
        </Card>
      </Col>
    ));

    const requiredItem = this.state.requiredItem;
    let modalData = this.state.type[requiredItem];
    return (
      <div>
        <Container fluid>
          <Button variant="primary">Add Vehicle</Button>
          <Row>{list}</Row>
        </Container>
        <Modal show={this.state.show} onHide={this.hideModal} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Add Vehicles</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.saveModalDetails}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>vehicle</Form.Label>
                <Form.Control
                  type="vehicle"
                  //onChange={this.saveVehicleType}
                  placeholder={modalData && modalData.vehicle_type}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.hideModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
export default VehicleList;

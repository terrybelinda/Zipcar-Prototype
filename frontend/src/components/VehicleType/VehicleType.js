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

class VehicleType extends Component {
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
      .get("http://localhost:8080/api/allvehicletype")
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
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
    const data = {
      id: item.id,
      vehicle_type: item.vehicle_type,
      hours: item.hours,
      price: item.price,
      status: item.status,
    };
    console.log(data);
    console.log(item);
    axios
      .post("http://localhost:8080/api/deletevehicletype", data)
      .then((res) => {
        if (res.status === 200) {
          console.log("yay");
          console.log(res);
          this.setState({
            type: [...newItems],
          });
        }
      })
      .catch((err) => {
        console.log(err);
        this.props.authFail(err.response.data.msg);
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
  // saveVehicleType(e) {
  //   const requiredItem = this.state.requiredItem;
  //   let temptype = this.state.type;
  //   temptype[requiredItem].vehicle_type = e.target.value;
  //   //this.setState({ type: temptype });
  //   // this.setState({ show: false });
  // }

  saveModalDetails(e) {
    //console.log(e.target.elements[0].value);
    // make api call
    // setstate
    const requiredItem = this.state.requiredItem;
    let temptype = this.state.type;
    temptype[requiredItem].vehicle_type = e.target.elements[0].value;
    this.setState({ type: temptype });
    this.setState({ show: false });
  }
  /*
export const Types = (props) => {
  let types = {
    a: { vehicle_type: "truck" },
    b: { vehicle_type: "car" },
    c: { vehicle_type: "bike" },
  };
*/
  render() {
    const list = this.state.type.map((item, index) => (
      <Col sm="3">
        <Card
          bg="light"
          //style={{ width: "18rem" }}
          className="mt-2 border border-primary"
          key={item.id}
        >
          <Card.Header as="h5">Type: {item.vehicle_type}</Card.Header>

          <Card.Body>
            <Row>
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
            </Row>

            <Row>
              <Card.Text id="vid">
                <b>price : </b> {item.price}
              </Card.Text>
            </Row>

            <Row>
              <Card.Text id="condition">hours: {item.hours}</Card.Text>
            </Row>
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
        <Container>
          <Button variant="primary">Add Vehicle Type</Button>
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
export default VehicleType;

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
    const year = new Date().getFullYear();
    this.years = Array.from(new Array(20), (val, index) => year - 1 - index);
    this.state = {
      requiredItem: 0,
      type: [],
      show: false,
      showAdd: false,
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

    axios
      .post("http://localhost:8080/api/deletevehicle", item)
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

  showModalAdd = () => {
    this.setState({ showAdd: true });
  };

  hideModalAdd = () => {
    this.setState({ showAdd: false });
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
      <Col md="3">
        <Card
          bg="light"
          //style={{ width: "18rem" }}
          className="mt-2 border border-primary"
          key={item.id}
        >
          <Card.Img variant="top" src={require("./Capture.PNG")} />
          <Card.Header as="h5">
            licence #: {item.license_no} {item.make}, {item.model}
          </Card.Header>

          <Card.Body>
            <Card.Text id="year"> Year :{item.year}</Card.Text>
            {/*
            Status:
            {item.status == 1 ? (
              <Button disabled size="sm" variant="success">
                Active
              </Button>
            ) : (
              <Button disabled size="sm" variant="danger">
                Inactive
              </Button>
            )}
            */}
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
            <Card.Text id="last_service">
              Last Serviced: {item.last_serviced}
            </Card.Text>
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
            <Card.Link
              href="#"
              onClick={() => {
                if (
                  window.confirm("Are you sure you wish to delete this item?")
                )
                  this.removeItem(item);
              }}
            >
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
          <Button variant="primary" onClick={() => this.showModalAdd()}>
            Add Vehicle
          </Button>
          <Row>{list}</Row>
        </Container>
        <Modal show={this.state.show} onHide={this.hideModal} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Edit {modalData && modalData.license_no}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.saveModalDetails}>
              <Form.Row>
                <Form.Group as={Col} controlId="formBasicvid">
                  <Form.Label>Vehicle Identification Number</Form.Label>
                  <Form.Control
                    type="name"
                    placeholder={modalData && modalData.vid}
                    maxLength="16"
                    disabled
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formBasicLicenseNo">
                  <Form.Label>License #</Form.Label>
                  <Form.Control
                    type="name"
                    placeholder={modalData && modalData.license_no}
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formBasicMake">
                  <Form.Label>Make</Form.Label>
                  <Form.Control
                    type="name"
                    placeholder={modalData && modalData.make}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formBasicModel">
                  <Form.Label>Model</Form.Label>
                  <Form.Control
                    type="name"
                    placeholder={modalData && modalData.model}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridYear">
                  <Form.Label>Year</Form.Label>
                  <Form.Control
                    as="select"
                    placeholder={modalData && modalData.year}
                  >
                    <option selected="selected" disabled="disabled">
                      {modalData && modalData.year}
                    </option>
                    {this.years.map((year, index) => {
                      return (
                        <option key={`year${index}`} value={year}>
                          {year}
                        </option>
                      );
                    })}
                  </Form.Control>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formBasicCurrentMileage">
                  <Form.Label>Current Mileage</Form.Label>
                  <Form.Control
                    type="name"
                    placeholder={modalData && modalData.current_mileage}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formBasicCondition">
                  <Form.Label>Condition</Form.Label>
                  <Form.Control
                    as="select"
                    placeholder={modalData && modalData.condition}
                  />
                  <option selected="selected" disabled="disabled">
                    {modalData && modalData.condition}
                  </option>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formBasicRegistrationExpiry">
                  <Form.Label>Registration Expiry</Form.Label>
                  <Form.Control
                    type="date"
                    defaultValue={modalData && modalData.regisration_expiry}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formBasicLastServiced">
                  <Form.Label>Last Serviced</Form.Label>
                  <Form.Control
                    type="date"
                    defaultValue={modalData && modalData.last_serviced}
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formBasicVehicleType">
                  <Form.Label>Vehicle Type</Form.Label>
                  <Form.Control
                    type="name"
                    placeholder={modalData && modalData.vehicle_type}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formBasicRentalLocation">
                  <Form.Label>Rental Location</Form.Label>
                  <Form.Control
                    type="name"
                    placeholder={modalData && modalData.rental_location}
                  />
                </Form.Group>
              </Form.Row>
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
        {/* Modal for add*/}
        <Modal
          show={this.state.showAdd}
          onHide={this.hideModalAdd}
          animation={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Vehicle</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.saveModalDetails}>
              <Form.Row>
                <Form.Group as={Col} controlId="formBasicvid">
                  <Form.Label>Vehicle Identification Number</Form.Label>
                  <Form.Control
                    type="name"
                    placeholder="Enter VIN"
                    maxLength="16"
                    disabled
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formBasicLicenseNo">
                  <Form.Label>License #</Form.Label>
                  <Form.Control type="name" placeholder="Enter License #" />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formBasicMake">
                  <Form.Control type="name" placeholder="Enter Make" />
                </Form.Group>
                <Form.Group as={Col} controlId="formBasicModel">
                  <Form.Control type="name" placeholder="Enter Model" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridYear">
                  <Form.Control as="select" placeholder="Enter Model Year">
                    <option selected="selected" disabled="disabled">
                      {"Year"}
                    </option>
                    {this.years.map((year, index) => {
                      return (
                        <option key={`year${index}`} value={year}>
                          {year}
                        </option>
                      );
                    })}
                  </Form.Control>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formBasicCurrentMileage">
                  <Form.Control
                    type="name"
                    placeholder="Enter Current Mileage"
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formBasicCondition">
                  <Form.Control
                    as="select"
                    placeholder="Choose Vehicle condition"
                  >
                    <option selected="selected" disabled="disabled">
                      {"Choose Vehicle condition"}
                    </option>
                  </Form.Control>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formBasicRegistrationExpiry">
                  <Form.Label>Registration Expiry</Form.Label>
                  <Form.Control type="date" />
                </Form.Group>
                <Form.Group as={Col} controlId="formBasicLastServiced">
                  <Form.Label>Last Serviced</Form.Label>
                  <Form.Control type="date" />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formBasicVehicleType">
                  <Form.Control as="select" placeholder="Choose Vehicle type">
                    <option selected="selected" disabled="disabled">
                      {"Choose Vehicle type"}
                    </option>
                  </Form.Control>
                </Form.Group>

                <Form.Group as={Col} controlId="formBasicRentalLocation">
                  <Form.Control
                    as="select"
                    placeholder="Choose Rental condition"
                  >
                    <option selected="selected" disabled="disabled">
                      {"Choose Rental condition"}
                    </option>
                  </Form.Control>
                </Form.Group>
              </Form.Row>
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={this.hideModalAdd}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
export default VehicleList;

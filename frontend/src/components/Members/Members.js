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
import { UsaStates as usaStates } from "usa-states";

class Members extends Component {
  constructor(props) {
    super(props);
    const year = new Date().getFullYear();
    this.years = Array.from(new Array(20), (val, index) => year - 1 - index);
    this.state = {
      requiredItem: [],
      type: [],
      show: false,
      showAdd: false,
      key: "",
    };
  }

  componentDidMount() {
    this.getMembers();
  }

  getMembers = () => {
    axios.defaults.headers.common["x-auth-token"] = localStorage.getItem(
      "token"
    );
    /*
    axios.get("http://localhost:8080/api/locations").then((res) => {
      if (res.status == 200) {
        if (res.data) {
          console.log(res.data);
          this.setState({ type: res.data });
        }
      }
    });
    // .catch((err) => {});
    */
  };

  removeItem(item) {
    const newItems = this.state.type.filter((type) => {
      return type !== item;
    });

    axios
      .post("http://localhost:8080/api/deletelocation", item)
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

  render() {
    const list = this.state.type.map((item, index) => (
      <Col md="3">
        <Card
          bg="light"
          //style={{ width: "18rem" }}
          className="mt-2 border border-primary"
          key={item.id}
        >
          <Card.Body>
            <Card.Text id="rental_name">
              <b>Rental Location Name: </b>
              {item.name}
            </Card.Text>
            <Card.Text id="rental_phone">
              <b>Phone: </b> {item.phone}
            </Card.Text>

            <Card.Text id="rental_capacity">
              <b>Capacity: </b>
              {item.capcity}
            </Card.Text>

            <Card.Text id="rental_location">
              <b>Address: </b>
              {item.apt} {item.street} {item.state} {item.zipcode}
              {/* {
                item.apt + ", " + item.street,
                ", " + item.state,
                "- " + item.zipcode
              } */}
            </Card.Text>

            <Card.Link
              href="#"
              onClick={() => {
                if (
                  window.confirm("Are you sure you wish to delete this item?")
                )
                  this.removeItem(item);
              }}
            >
              Terminate
            </Card.Link>
          </Card.Body>
        </Card>
      </Col>
    ));

    return (
      <div>
        <Container fluid>
          <Row>{list}</Row>
        </Container>
      </div>
    );
  }
}
export default Members;

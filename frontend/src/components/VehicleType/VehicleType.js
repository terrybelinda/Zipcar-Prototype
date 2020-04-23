import React from "react";
import { Card, Button, Modal, Form, Alert, Badge } from "react-bootstrap";

export const Types = props => {
  let types = {
    a: { vehicle_type: "truck" },
    b: { vehicle_type: "car" },
    c: { vehicle_type: "bike" }
  };

  const list = Object.keys(types).map(key => (
    <Card
      bg="light"
      style={{ width: "45rem", paddingRight: "100px" }}
      className="mt-2"
    >
      <Card.Body>
        <Button
          type="button"
          variant="link"
          className="p-0"
          onClick={() => props.controlModal(true, types[key])}
        >
          {types[key].vehicle_type}
        </Button>
        <Card.Text id="type">{types[key].vehicle_type}</Card.Text>
        <Card.Link href="#">Update</Card.Link>
        <Card.Link href="#">Delete</Card.Link>
      </Card.Body>
    </Card>
  ));
  return (
    <div style={{ paddingLeft: "300px" }}>
      <Button variant="outline-primary">Add</Button>
      {list}
    </div>
  );
};

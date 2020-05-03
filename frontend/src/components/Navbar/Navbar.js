import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown, NavbarBrand } from "react-bootstrap";

//import { withRouter } from "react-router-dom";
//import { connect } from "react-redux";

class Navigation extends Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/profile">
          <img
            alt=""
            src={"http://localhost:3000/images/logo.png"}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          Home
          {/* <Nav.Link href="/profile">Home</Nav.Link> */}
        </Navbar.Brand>

        <Nav className="mr-auto">
          {localStorage.getItem("token") && (
            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
          )}
          {localStorage.getItem("token") && (
            <Nav.Link href="/application">Applications</Nav.Link>
          )}
          {localStorage.getItem("token") && (
            <Nav.Link href="/event">Events</Nav.Link>
          )}
        </Nav>

        {/* </Navbar.Brand> */}
        {!localStorage.getItem("token") && <Link to="/login">Sign In</Link>}

        {!localStorage.getItem("token") && (
          <Link className="pl-5" to="/VehicleType">
            Vehicle Type
          </Link>
        )}

        {!localStorage.getItem("token") && (
          <Link className="pl-5" to="/VehicleList">
            Vehicle List
          </Link>
        )}
        {!localStorage.getItem("token") && (
          <Link className="pl-5" to="/RentalLocation">
            Rental Locations
          </Link>
        )}
        {!localStorage.getItem("token") && (
          <Link className="pl-5" to="/signup">
            Sign Up
          </Link>
        )}
        {/* {localStorage.getItem("token") && (
          <NavDropdown title={"User"} id="collasible-nav-dropdown">
            <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/logout">Sign Out</NavDropdown.Item>
          </NavDropdown>
        )} */}
        {/* add logged in check after setting it from frontend */}
        <NavDropdown title={"Account"} id="collasible-nav-dropdown">
          <NavDropdown.Item href="/vehicles">Vehicles</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="/logout">Sign Out</NavDropdown.Item>
        </NavDropdown>
      </Navbar>
      //localStorage.getItem('first_name') ? localStorage.getItem('first_name') :
    );
  }
}

export default Navigation;

import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

//import { withRouter } from "react-router-dom";
//import { connect } from "react-redux";

class Navigation extends Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark">
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
        {!localStorage.getItem("token") && <Link to="/login">Sign In</Link>}

        {!localStorage.getItem("token") && (
          <Link className="pl-5" to="/VehicleType">
            Vehicle Type
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
            <NavDropdown.Item href="/profile">Vehicles</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/logout">Sign Out</NavDropdown.Item>
          </NavDropdown>
      </Navbar>
      //localStorage.getItem('first_name') ? localStorage.getItem('first_name') :
    );
  }
}

export default Navigation;

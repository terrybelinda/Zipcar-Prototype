import React, { Component } from "react";
import { Route } from "react-router-dom";
import "../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import RentalLogin from "./rentalLogin/rentalLogin";
import SignUp from "./signUp/signUp";
import Navigation from "./Navbar/Navbar";
import { Types } from "./VehicleType/VehicleType";
import UserProfile from './user/Profile';


class Home extends Component {
  render() {
    return (
		<div>
        <Route path="/" component={Navigation} />
        <Route exact path="/login" component={RentalLogin} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path ='/profile' component={UserProfile}/>
        <Route path="/VehicleType" component={Types} />
		</div>
    );
  }
}
//export Home Component
export default Home;

import React, { Component } from "react";
import Map from './Map';

class UserProfile extends Component {
	render() {
	  return(
		  <Map
	   google={this.props.google}
	   center={{lat: 37.333930, lng: -121.910608}}
	   height='300px'
	   zoom={17}
	  />
		)
	}
  }

  export default UserProfile;
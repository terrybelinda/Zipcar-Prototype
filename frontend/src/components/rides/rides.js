import React, { Component } from "react";
import {rooturl} from '../../config';
import axios from 'axios';
import { Card, Button, Col, Image, Alert, Badge, Row } from "react-bootstrap";

class Rides extends Component {
	constructor() {
		super();

		this.state = {
			reservations: []
		}
	}
	

	componentDidMount() {
		this.getReservations();
	}

	getReservations = () => {
		let params = new URLSearchParams();
		params.set('email', localStorage.getItem("email"));
        axios.get(rooturl  + "/allreservations?"+params.toString())
        .then(res => {
            if(res.status === 200){
                if(res.data){
					this.setState({
						reservations: res.data
					})
                }
            }
        })
        .catch(err=>{
            //this.props.setError(err.response.data);
        })
	} 

	render(){
		let list;
  		list = 
			Object.keys(this.state.reservations).map(key => (
			<Col >
			<Card
			bg="light"
			style={{ width: "30rem", paddingRight: "100px" }}
			className="mt-2"
			>
			<Card.Body>
				<Card.Header>Reservation Number: {this.state.reservations[key].id}</Card.Header>
				<Row>
					<Col id="start_time">Ride Time:{this.state.reservations[key].start_time} </Col>
					<Col id="end_time">To {this.state.reservations[key].end_time} </Col>
				</Row>
				{/* <Row>
					<Col id="model">Model: {this.state.reservations[key].model}</Col>
					<Col style={{color: "Green", fontWeight: "500", textAlign: "right"}}>$100.00/day</Col>
				</Row>
				<Row>
					<Col id="car_condition">Condition: {this.state.reservations[key].car_condition}</Col>
				</Row>
				<Row>
					<Col id="model_year"> Model Year: {this.state.reservations[key].model_year}</Col>
				</Row> */}
				<Row>
					<Button variant="success" onClick={() => this.showSelectedCar(true, this.state.reservations[key])}>Show Ride</Button>
					<Button variant="warning" onClick={() => this.showSelectedCar(true, this.state.reservations[key])}>Cancel Ride</Button>
				</Row>
				
			</Card.Body>
			</Card>
			</Col>
  ));

		return(
			<div>
			   <h2 style={{color: "Gray", fontWeight: "500", textAlign: "center"}}>Your Trips</h2>
			  <Row>
				  <Col md={4}>{list}</Col>
			  </Row>
			</div>
		)
	}
}

export default Rides;
import React, { Component } from "react";
import {rooturl} from '../../config';
import axios from 'axios';
import { Card, Button, Col, Image, Alert, Form, Row, Modal } from "react-bootstrap";

class Rides extends Component {
	constructor() {
		super();

		this.state = {
			reservations: [],
			pastreservations: [],
			upcomingreservations: [],
			selectedreservation: null,
			showEndRide: false,
			showCancelRide: false,
			selectedreservationcancel: null,
		}
	}
	

	componentDidMount() {
		this.getReservations();
		this.pastReservations();
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

	pastReservations = () => {
		let params = new URLSearchParams();
		params.set('email', localStorage.getItem("email"));
        axios.get(rooturl  + "/pastreservations?"+params.toString())
        .then(res => {
            if(res.status === 200){
                if(res.data){
					this.setState({
						pastreservations: res.data
					})
                }
            }
        })
        .catch(err=>{
            //this.props.setError(err.response.data);
        })
	} 

	gotoMainPage = () => {
		this.props.history.push('/profile');
	}

	endRideToBackend = (reservation) => {

		const data = {
			id : reservation.id,
		}
		axios.post(rooturl + '/endreservation', data)
		.then(response => {
			console.log("Response Status: " + response.status);
					if(response.status === 200){
						this.setState({
							showEndRide: false,
							selectedreservation: null,
						})
						this.props.history.push('/rides');
					}
				})
		.catch(err => {
		})

	}
	endRide = (action, reservation) => {
		
		this.setState({
			showEndRide: action,
			selectedreservation: reservation,
		})
	}

	cancelRide = (action, reservation) => {
		
		this.setState({
			showCancelRide: action,
			selectedreservationcancel: reservation,
		})
	}

	hideEndRide = () => {
		this.setState({
			showEndRide: false,
			selectedreservation: null 
		})
	}

	hideCancelRide = () => {
		this.setState({
			showCancelRide: false,
			selectedreservationcancel: null 
		})
	}

	render(){

		let endRideModal;
		if(this.state.selectedreservation) {
			endRideModal = (
				<Modal show={true} onHide={false} animation={false}>
					<Modal.Header closeButton>
            			<Modal.Title>End reservation</Modal.Title>
          			</Modal.Header>
					<Modal.Body>
					<Row>
						<Col>Reservation Number: {this.state.selectedreservation.id}</Col>	
					</Row>
						<Row>
							<Col id="start_time"><b>Ride Start Time: </b>{this.state.selectedreservation.start_time} </Col>
							
						</Row>
						<Row>
							<Col id="end_time"><b>Ride End Time: </b> {this.state.selectedreservation.end_time} </Col>
						</Row>
						<Row>
							<Col id="msg">Hope you had a great Trip. See you next time! </Col>
						</Row>
						<Row>
							<Button className="ml-5" variant="success" onClick={() => this.endRideToBackend(this.state.selectedreservation)}>Confirm</Button>
							{/* <Button variant="warning" onClick={() => this.hideEndRide(false)}>Cancel</Button> */}
						</Row>
						<Modal.Footer>
							<Button variant="warning" onClick={() => this.hideEndRide(false)}>Cancel</Button>
          				</Modal.Footer>
					</Modal.Body>
					</Modal>
			);
		}

		let cancelRideModal;
		if(this.state.selectedreservationcancel) {
			cancelRideModal = (
				<Modal show={true} onHide={false} animation={false}>
					<Modal.Header closeButton>
            			<Modal.Title>Cancel reservation</Modal.Title>
          			</Modal.Header>
					<Modal.Body>
						<Row>
							<Col>Reservation Number: {this.state.selectedreservationcancel.id}
							</Col></Row>
						<Row>
							<Col id="start_time">Ride Time:{this.state.selectedreservationcancel.start_time} </Col>
							
						</Row>
						<Row>
							<Col id="end_time">To {this.state.selectedreservationcancel.end_time} </Col>
						</Row>
						<Row>
							<Col id="msg">Hope everything is fine. Why cancel this trip! </Col>
						</Row>
						<Row>
							<Button variant="success" onClick={() => this.showSelectedCar(true, this.state.selectedreservationcancel)}>Confirm</Button>
							<Button variant="warning" onClick={() => this.hideCancelRide(false)}>Cancel</Button>
						</Row>
					</Modal.Body>
				</Modal>
			);
		}
		

		let pastRidesH;

		pastRidesH = (
			<h2 style={{color: "Gray", fontWeight: "500", textAlign: "center"}}>Completed trips</h2>
		);
		let past;
		if(this.state.pastreservations.length > 0) {
			past = Object.keys(this.state.pastreservations).map(key => (
				<Col >
				<Card
				bg="light"
				style={{ width: "30rem", paddingRight: "100px" }}
				className="mt-2"
				>
				<Card.Body>
					<Card.Header>Reservation Number: {this.state.pastreservations[key].id}</Card.Header>
					<Row>
						<Col id="start_time">Ride Time:{this.state.pastreservations[key].start_time} </Col>
						
					</Row>
					<Row>
						<Col id="end_time">To {this.state.pastreservations[key].end_time} </Col>
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
					{/* <Row>
						<Button variant="success" onClick={() => this.showSelectedCar(true, this.state.pastreservations[key])}>End Ride</Button>
						<Button variant="warning" onClick={() => this.showSelectedCar(true, this.state.pastreservations[key])}>Cancel Ride</Button>
					</Row> */}
					
				</Card.Body>
				</Card>
				</Col>
	  		));
		} else {
			past = (
			<h2 style={{color: "Gray", fontWeight: "500", textAlign: "center"}}>No Past trips</h2>
			);
		}
		
		let upcomingRidesH;

		upcomingRidesH = (
			<h2 style={{color: "Gray", fontWeight: "500", textAlign: "center"}}>Upcoming Trips</h2>
		);
		let upcoming;
		if(this.state.reservations.length > 0) {
			upcoming = Object.keys(this.state.reservations).map(key => (
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
						
					</Row>
					<Row>
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
					<Button variant="success" onClick={() => this.endRide(true, this.state.reservations[key])}>End Ride</Button>
					<Button variant="warning" onClick={() => this.cancelRide(true, this.state.reservations[key])}>Cancel Ride</Button>
					</Row>
					
				</Card.Body>
				</Card>
				</Col>
	  		));
		} else {
			upcoming = (
				<div style={{textAlign: "center"}} >
					<h2 style={{color: "Gray", fontWeight: "500", textAlign: "center"}}>No upcoming trips</h2>
					<Button variant="success" onClick={() => this.gotoMainPage()}>Book a trip</Button>
				</div>
			);
		}

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
					
				</Row>
				<Row>
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
					<Button variant="success" onClick={() => this.endRide(true, this.state.reservations[key])}>End Ride</Button>
					<Button variant="warning" onClick={() => this.cancelRide(true, this.state.reservations[key])}>Cancel Ride</Button>
				</Row>
				
			</Card.Body>
			</Card>
			</Col>
  ));

		return(
			<div>
				<h2 style={{color: "Gray", fontWeight: "500", textAlign: "center"}}>Your Trips</h2>
				<hr class="mt-2 mb-3"/>
			   {upcomingRidesH}
			   <Row>
				  <Col md={4}>{upcoming}</Col>
				  <Col md={8}> {cancelRideModal}{endRideModal}</Col>
			  </Row>
			  <hr class="mt-2 mb-3"/>
			  {/* <Row>
				  <Col md={4}>{list}</Col>
				  <Col md={8}> {cancelRideModal}{endRideModal}</Col>
				  
			  </Row> */}
			  <hr class="mt-2 mb-3"/>
			  {pastRidesH}
			  <Row>
				  <Col md={4}>{past}</Col>
			  </Row>
			  
			</div>
		)
	}
}

export default Rides;
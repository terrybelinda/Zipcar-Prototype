import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';

class Home extends Component {
	constructor() {
		super();
		this.state = {
			customers: []
		};
	}
	//get the books data from backend
	componentDidMount() {
		axios.get('http://localhost:8080/api/customer').then(response => {
			//update the state with the response data
			this.setState({
				customers: this.state.customers.concat(response.data)
			});
		});
	}

	render() {
		//iterate over books to create a table row
		let details = this.state.customers.map((customer, i) => {
			return (
				<tr key={i}>
					<td>{customer.name}</td>
					<td>{customer.gender}</td>
					{/* <td>{customer.Author}</td> */}
				</tr>
			);
		});
		//if not logged in go to login page
		// let redirectVar = null;
		// if (!cookie.load('cookie')) {
		// 	redirectVar = <Redirect to='/login' />;
		// }
		return (
			<div>
				{/* {redirectVar} */}
				<div className='container'>
					<h2>List of All Customers</h2>
					<table className='table'>
						<thead>
							<tr>
								<th>Customer Name</th>
								<th>Gender</th>
							</tr>
						</thead>
						<tbody>
							{/*Display the Tbale row based on data recieved*/}
							{details}
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}
//export Home Component
export default Home;

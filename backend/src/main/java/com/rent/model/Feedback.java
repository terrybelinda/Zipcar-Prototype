package com.rent.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table ( name = "feedback" )
public class Feedback {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column
	private Integer id;
	
	@Column
	private Integer user_id;
	
	@Column
	private Integer vehicle_id;
	
	@Column
	private String comments;
	
	@Column
	private Integer service_satisfaction;
	
	@Column
	private Integer car_satisfaction;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	
	public int getUser_id() {
		return user_id;
	}

	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}

	public int getVehicle_id() {
		return vehicle_id;
	}

	public void setVehicle_id(int vehicle_id) {
		this.vehicle_id = vehicle_id;
	}

	public String getComments() {
		return comments;
	}

	public void setComments(String comments) {
		this.comments = comments;
	}

	public Integer getService_satisfaction() {
		return service_satisfaction;
	}

	public void setService_satisfaction(Integer serviceSatisfaction) {
		this.service_satisfaction = serviceSatisfaction;
	}

	public Integer getCar_satisfaction() {
		return car_satisfaction;
	}

	public void setCar_satisfaction(Integer carSatisfaction) {
		this.car_satisfaction = carSatisfaction;
	}
}
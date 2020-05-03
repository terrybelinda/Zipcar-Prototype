package com.rent.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table ( name = "feedback" )
public class Feedback {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column
	private Integer id;
	
	@ManyToOne(targetEntity = User.class)
	private Integer userId;
	
	@ManyToOne(targetEntity = Vehicle.class)
	private Integer vehicleId;
	
	@Column
	private String comments;
	
	@Column
	private Integer serviceSatisfaction;
	
	@Column
	private Integer carSatisfaction;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public Integer getVehicleId() {
		return vehicleId;
	}

	public void setVehicleId(Integer vehicleId) {
		this.vehicleId = vehicleId;
	}

	public String getComments() {
		return comments;
	}

	public void setComments(String comments) {
		this.comments = comments;
	}

	public Integer getServiceSatisfaction() {
		return serviceSatisfaction;
	}

	public void setServiceSatisfaction(Integer serviceSatisfaction) {
		this.serviceSatisfaction = serviceSatisfaction;
	}

	public Integer getCarSatisfaction() {
		return carSatisfaction;
	}

	public void setCarSatisfaction(Integer carSatisfaction) {
		this.carSatisfaction = carSatisfaction;
	}
}

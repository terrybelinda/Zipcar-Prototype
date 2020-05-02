package com.rent.model;

import java.util.List;

public class VehicleTypeGroup {
	
	private String vehicleType;
	
	private List<Integer> hrList;
	private List<String> priceList;
	
	public String getVehicleType() {
		return vehicleType;
	}
	public void setVehicleType(String vehicleType) {
		this.vehicleType = vehicleType;
	}
	public List<Integer> getHrList() {
		return hrList;
	}
	public void setHrList(List<Integer> hrList) {
		this.hrList = hrList;
	}
	public List<String> getPriceList() {
		return priceList;
	}
	public void setPriceList(List<String> priceList) {
		this.priceList = priceList;
	}

}

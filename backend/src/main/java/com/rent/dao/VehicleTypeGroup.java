package com.rent.dao;

import java.util.ArrayList;
import java.util.List;

public class VehicleTypeGroup {
	String vehicleType;
	List<Integer> hourList = new ArrayList();
	List<String> priceList = new ArrayList();
	
	public String getVehicleType() {
		return vehicleType;
	}

	public void setVehicleType(String vehicleType) {
		this.vehicleType = vehicleType;
	}

	public List<Integer> getHourList() {
		return hourList;
	}

	public void setHourList(List<Integer> hourList) {
		this.hourList = hourList;
	}

	public List<String> getPriceList() {
		return priceList;
	}

	public void setPriceList(List<String> priceList) {
		this.priceList = priceList;
	}

	VehicleTypeGroup(String type) {
		this.vehicleType = type;
	}
	
	void addInHourList(Integer hr) {
		hourList.add(hr);
	}
	void addInPriceList(String hr) {
		priceList.add(hr);
	}
}


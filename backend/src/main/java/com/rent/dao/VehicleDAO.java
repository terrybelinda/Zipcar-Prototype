package com.rent.dao;

import java.util.List;

import com.rent.model.Vehicle;

public interface VehicleDAO {
	
	public List<Vehicle> getByLocation(String area, String city, String state);
}

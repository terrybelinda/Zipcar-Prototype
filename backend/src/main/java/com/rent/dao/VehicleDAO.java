package com.rent.dao;

import java.util.List;

import com.rent.model.Vehicle;

public interface VehicleDAO {
	
	public List<Vehicle> getByLocation(String zipcode);
	public List<Vehicle> getVehicle(String type);
	public List<Vehicle> vehicleRequest(String area,String city,String state, String make, String model);
	public List<Vehicle> vehicleSimilar(String make, String model);
}

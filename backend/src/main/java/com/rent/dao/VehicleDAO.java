package com.rent.dao;

import java.util.Date;
import java.util.HashSet;
import java.util.List;

import com.rent.model.Vehicle;

public interface VehicleDAO {
	
	public List<Vehicle> getByLocation(String zipcode, Date startdatetime, Date enddatetime);
	public HashSet<String> getVehicle(String type);
	public List<Vehicle> vehicleRequest(String zipcode, String make, String model);
	public List<Vehicle> vehicleSimilar(String make, String model);
	public List<Vehicle> getAllVehicle();
}

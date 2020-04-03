package com.rent.service;

import java.util.List;

import com.rent.model.Vehicle;;

public interface VehicleService {

	List<Vehicle> getByLocation(String zipcode);
	List<Vehicle> getVehicle(String type);
	List<Vehicle> vehicleRequest(String area, String city, String state, String make, String model);
	
}

package com.rent.service;


import java.util.*;

import com.rent.model.Vehicle;


public interface VehicleService {

	List<Vehicle> getByLocation(String zipcode, Date startdatetime, Date enddatetime);
	HashSet<String> getVehicle(String type);
	List<Vehicle> vehicleRequest(String zipcode, String make, String model);
	List<Vehicle> getAllVehicle();
	
}

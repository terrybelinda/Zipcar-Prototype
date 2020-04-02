package com.rent.service;

import java.util.List;

import com.rent.model.Vehicle;;

public interface VehicleService {

	List<Vehicle> getByLocation(String area, String city, String state);
	
	
}

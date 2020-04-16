package com.rent.service;

import java.util.*;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.rent.dao.VehicleDAO;
import com.rent.model.Vehicle;

@Service
public class VehicleService_Impl implements VehicleService{

	@Autowired
	VehicleDAO vehicleDAO;
	
	@Transactional
	@Override
	public List<Vehicle> getByLocation(String zipcode, Date startdatetime, Date enddatetime) {
		return vehicleDAO.getByLocation(zipcode, startdatetime, enddatetime);
	}
	
	public HashSet<String> getVehicle(String type){
		return vehicleDAO.getVehicle(type);
	}
	
	public List<Vehicle> vehicleRequest(String zipcode, String make, String model) {
		List<Vehicle> request = vehicleDAO.vehicleRequest(zipcode, make, model); 
		if(request.size() == 0){
			 return vehicleDAO.vehicleSimilar(make, model);
			
		}
		 else {
			 return request;
		 }
	}
	
	public List<Vehicle> getAllVehicle(){
		return vehicleDAO.getAllVehicle();
	}
}

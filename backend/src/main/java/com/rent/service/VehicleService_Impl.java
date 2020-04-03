package com.rent.service;

import java.util.List;

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
	public List<Vehicle> getByLocation(String zipcode) {
		return vehicleDAO.getByLocation(zipcode);
	}
	public List<Vehicle> getVehicle(String type){
		return vehicleDAO.getVehicle(type);
	}
	
	public List<Vehicle> vehicleRequest(String area, String city, String state, String make, String model) {
		List<Vehicle> request = vehicleDAO.vehicleRequest(area, city, state, make, model); 
		if(request.size() == 0){
			 return vehicleDAO.vehicleSimilar(make, model);
			
		}
		 else {
			 return request;
		 }
	}
}

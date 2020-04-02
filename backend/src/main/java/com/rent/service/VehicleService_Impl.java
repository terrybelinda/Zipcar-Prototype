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
	public List<Vehicle> getByLocation(String area, String city, String state) {
		return vehicleDAO.getByLocation(area, city, state);
	}

	
}

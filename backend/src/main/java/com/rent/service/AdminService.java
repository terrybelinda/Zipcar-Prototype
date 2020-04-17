package com.rent.service;

import java.util.List;

import com.rent.model.Customer;
import com.rent.model.VehicleType;

public interface AdminService {

	List<VehicleType> get();
	void save(VehicleType vt);
	void deleteVehicletype(String vtname);
	void updateVehicletype(String vtname, String price, int hours);
	
}

package com.rent.service;

import java.util.HashMap;
import java.util.List;

import com.rent.model.Customer;
import com.rent.model.VehicleType;
import com.rent.dao.VehicleTypeGroup;
import com.rent.model.*;

public interface AdminService {

	List<VehicleTypeGroup> get();
	void save(VehicleType vt);
	void deleteVehicletype(VehicleType vt);
	void updateVehicletype(String vtname, String price, int hours);
	void saveVehicle(Vehicle vehicle);
	void updateVehicle(Vehicle vehicle);
	void deleteVehicle(Vehicle vehicle);
	
}

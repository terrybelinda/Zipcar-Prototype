package com.rent.dao;

import java.util.List;

import com.rent.model.Location;
import com.rent.model.Vehicle;
import com.rent.model.VehicleType;

public interface AdminDAO {

	List<VehicleTypeGroup> get();
	void save(VehicleType vt);
	void deleteVehicletype(String vtname);
	void updateVehicletype(String vtname, String price, int hours);
	void saveVehicle(Vehicle vehicle);
	void deleteVehicle(String vid);
	void updateVehicle(Vehicle vehicle);
	Location saveLocation(Location location);
	void deleteLocation(Integer id);
	List<Location> getLocations();
	void editLocation(Location location);
	
}

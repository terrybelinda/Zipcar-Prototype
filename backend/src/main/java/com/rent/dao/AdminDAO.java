package com.rent.dao;

import java.util.List;

import com.rent.model.VehicleType;

public interface AdminDAO {

	List<VehicleType> get();
	void save(VehicleType vt);
	void deleteVehicletype(int id);
}

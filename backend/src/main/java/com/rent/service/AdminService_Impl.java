package com.rent.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.rent.dao.AdminDAO;
import com.rent.model.VehicleType;

@Service
public class AdminService_Impl implements AdminService{

	@Autowired
	AdminDAO adminDAO;
	
	@Transactional
	@Override
	public List<VehicleType> get() {
		return adminDAO.get();
	}
	@Override
	public void save(VehicleType vt){
		adminDAO.save(vt);
	}
	public void deleteVehicletype(String vtname) {
		adminDAO.deleteVehicletype(vtname);
	}
	public void updateVehicletype(String vtname, String price, int hours) {
		adminDAO.updateVehicletype(vtname,price,hours);
	}
}
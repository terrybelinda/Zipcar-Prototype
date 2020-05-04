package com.rent.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.rent.model.Vehicle;
import com.rent.model.VehicleType;
import com.rent.service.AdminService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class AdminController {
	
	@Autowired
	private AdminService AdminService;
	
	@GetMapping("/allvehicletype")
	public List<VehicleType> get(){
		
		return AdminService.get();
	}
	
	@PostMapping("/addvehicletype")
	public String saveVehicleType(@RequestBody VehicleType vt) {
		AdminService.save(vt);
		return "Success";
	}
	
	@PostMapping("/deletevehicletype")
	public String deleteVehicleType(@RequestBody VehicleType vt) {
		
		AdminService.deleteVehicletype(vt);
		return "deleted";
	}
	
	@PostMapping("/updatevehicletype")
	public String updateVehicleType(@RequestBody VehicleType vt) {
		
		System.out.print(vt.getPrice());
		AdminService.updateVehicletype(vt.getVehicle_type(),vt.getPrice(),vt.getHours());
		return "updated";
	}
	
	@PostMapping("/deletevehicle")
	public void deleteVehicle(@RequestBody Vehicle vehicle) {
		AdminService.deleteVehicle(vehicle);
		
	}
	
	@PostMapping("/addvehicle")
	public Vehicle saveVehicle(@RequestBody Vehicle vehicle) {
		
		AdminService.saveVehicle(vehicle);
		return vehicle;
	}
	
	@PostMapping("/updatevehicle")
	public String updateVehicle(@RequestBody Vehicle vehicle) {
		AdminService.updateVehicle(vehicle);
		return "updated";
	}
	
	
		
}
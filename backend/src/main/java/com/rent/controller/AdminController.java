package com.rent.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

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
	
	@GetMapping("/deletevehicletype")
	public String deleteVehicleType(@RequestParam String vtname) {
		AdminService.deleteVehicletype(vtname);
		return "deleted";
	}
	
	@GetMapping("/updatevehicletype")
	public String updateVehicleType(@RequestParam String vtname, @RequestParam String price, @RequestParam int hours) {
		AdminService.updateVehicletype(vtname,price,hours);
		return "updated";
	}
	
		
}
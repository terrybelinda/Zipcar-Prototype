package com.rent.controller;

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

import com.rent.model.Vehicle;
import com.rent.service.VehicleService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class VehicleController {
	
	@Autowired
	private VehicleService vehicleService;
	
	@GetMapping("/location")
	@ResponseStatus
	public List<Vehicle> getLocation(@RequestParam String address) {
		
		String[] arrOfStr = address.split(", ");   
		return vehicleService.getByLocation(arrOfStr[0], arrOfStr[1], arrOfStr[2]);
	}
	
//	@GetMapping("/vehicle")
//	public List<Vehicle> getvehicle() {
//		return VehicleService.getAllVechicle();
//	}
//	
//	@GetMapping("/vehiclebytype")
//	public List<Vehicle> get(int vTypeId) {
//		return VehicleService.getAllVechicle(vTypeId);
//	}
	
	
}
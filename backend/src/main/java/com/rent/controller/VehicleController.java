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

import com.rent.model.Vehicle;
import com.rent.service.VehicleService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class VehicleController {
	
	@Autowired
	private VehicleService vehicleService;
	
	@GetMapping("/location")
	public List<Vehicle> getByLocation(@RequestParam String address, @RequestParam String startdatetime, @RequestParam String enddatetime) throws ParseException {
		
		String[] arrOfStr = address.split(", ");  
		String[] zipcode = arrOfStr[2].split(" ");
		
		startdatetime = startdatetime + ":00";
		enddatetime = enddatetime + ":00";
		Date startdatetime1 = new SimpleDateFormat("yyyy-mm-dd hh:mm:ss").parse(startdatetime);
		Date enddatetime1 = new SimpleDateFormat("yyyy-mm-dd hh:mm:ss").parse(enddatetime);
		return vehicleService.getByLocation(zipcode[1], startdatetime1, enddatetime1);
	}
	
	@GetMapping("/vehiclerequest")
	public List<Vehicle> vehicleRequest(@RequestParam String address, @RequestParam String make, @RequestParam String model) {
		
		String[] arrOfStr = address.split(", ");
		return vehicleService.vehicleRequest(arrOfStr[3], make, model);
			
	}
	@GetMapping("/vehiclebytype")
	public HashSet<String> getVehicle(@RequestParam String type) {
		return vehicleService.getVehicle(type);
	}
	
	@GetMapping("/allvehicles")
	public List<Vehicle> get(){
		 return vehicleService.getAllVehicle();
		
	}
		
}
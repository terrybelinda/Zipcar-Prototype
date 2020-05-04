package com.rent.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.rent.service.ReservationService;
import com.rent.model.Reservation;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class ReservationController {

	@Autowired
	private ReservationService reservationService;
	
	@GetMapping("/allreservations")
	public List<Reservation> getReservations(@RequestParam String email){
		 return reservationService.getReservations(email);
		
	}
}

package com.rent.service;

import java.util.*;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.rent.dao.ReservationDAO;
import com.rent.dao.VehicleDAO;
import com.rent.model.Reservation;
import com.rent.model.Vehicle;

@Service
public class ReservationService_Impl implements ReservationService{

	@Autowired
	ReservationDAO reservationDAO;
	
	@Override
	public List<Reservation> getReservations(String email) {
		return reservationDAO.getReservations(email);
	}
}

package com.rent.dao;

import java.util.List;

import com.rent.model.Reservation;
import com.rent.model.Vehicle;

public interface ReservationDAO {
	
	public List<Reservation> getReservations(String email);

}



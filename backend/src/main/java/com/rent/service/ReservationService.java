package com.rent.service;

import java.util.*;

import com.rent.model.Reservation;


public interface ReservationService {

	List<Reservation> getReservations(String email);
}

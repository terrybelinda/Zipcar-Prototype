package com.rent.dao;

import java.util.List;

import javax.persistence.EntityManager;

import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.rent.model.Reservation;
import com.rent.model.User;

@Repository
public class ReservationDAO_Impl implements ReservationDAO {
	
	@Autowired
	private EntityManager entityManager;

	@Override
	public List<Reservation> getReservations(String email) {
		Session currentSession = entityManager.unwrap(Session.class);
		Query<User> userQuery = currentSession.createQuery("from User where email =: userEmail", User.class);
		userQuery.setParameter("userEmail", email);
		User user = userQuery.getSingleResult();
		
		Query<Reservation> query = currentSession.createQuery("from Reservation where user_id = :user_id ", Reservation.class);
		query.setParameter("user_id", user.getId());
		return query.getResultList();	
	} 
	
	

}

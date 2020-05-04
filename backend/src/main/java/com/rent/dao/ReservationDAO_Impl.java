package com.rent.dao;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.List;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;

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
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Timestamp timestamp = new Timestamp(System.currentTimeMillis());
		Query<User> userQuery = currentSession.createQuery("from User where email =: userEmail", User.class);
		userQuery.setParameter("userEmail", email);
		User user = userQuery.getSingleResult();
		
		Query<Reservation> query = currentSession.createQuery("from Reservation r where user_id = :user_id and r.return_status = 0 and r.start_time >= : current_time order by r.id desc ", Reservation.class);
		query.setParameter("user_id", user.getId());
		query.setString("current_time",sdf.format(timestamp));
		return query.getResultList();	
	}
	
	@Override
	public List<Reservation> pastReservations(String email) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Timestamp timestamp = new Timestamp(System.currentTimeMillis());
		Session currentSession = entityManager.unwrap(Session.class);
		Query<User> userQuery = currentSession.createQuery("from User where email =: userEmail", User.class);
		userQuery.setParameter("userEmail", email);
		User user = userQuery.getSingleResult();
	
		Query<Reservation> query = currentSession.createQuery("from Reservation r where user_id = :user_id and (r.return_status = -1 or r.end_time <= :current_time) order by r.id desc ", Reservation.class);
		query.setParameter("user_id", user.getId());
		query.setString("current_time",sdf.format(timestamp));
		return query.getResultList();	
	}
	
	@Override
	public List<Reservation> upcomingReservations(String email) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Timestamp timestamp = new Timestamp(System.currentTimeMillis());
		Session currentSession = entityManager.unwrap(Session.class);
		Query<User> userQuery = currentSession.createQuery("from User where email =: userEmail", User.class);
		userQuery.setParameter("userEmail", email);
		User user = userQuery.getSingleResult();
		
		Query<Reservation> query = currentSession.createQuery("from Reservation r where user_id = :user_id and (r.return_statu order = 0 or r.start_time >= :current_time by r.id desc ", Reservation.class);
		query.setParameter("user_id", user.getId());
		query.setString("current_time",sdf.format(timestamp));
		return query.getResultList();	
	}

	@Override
	@Transactional
	public void endReservation(Reservation id) {
		Session currentSession = entityManager.unwrap(Session.class);
		Timestamp timestamp = new Timestamp(System.currentTimeMillis());
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Query endReservationQuery = currentSession.createQuery("Update Reservation r set r.return_time= :current_time, r.return_status = :status where r.id = :id ");
		endReservationQuery.setParameter("id",id.getId());
		endReservationQuery.setParameter("status",1);
		endReservationQuery.setString("current_time",sdf.format(timestamp));
		endReservationQuery.executeUpdate();
	}

	@Override
	@Transactional
	public void cancelReservation(Reservation id) {
		Session currentSession = entityManager.unwrap(Session.class);
		Query endReservationQuery = currentSession.createQuery("Update Reservation r set r.return_status = :status where r.id = :id ");
		endReservationQuery.setParameter("id",id.getId());
		endReservationQuery.setParameter("status",-1);
		endReservationQuery.executeUpdate();
		
	} 
	
	

}

package com.rent.dao;

import java.sql.Date;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
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
	
		Query<Reservation> query = currentSession.createQuery("from Reservation r where user_id = :user_id and (r.return_status in (-1, 1) or r.return_time <= :current_time) order by r.id desc ", Reservation.class);
		query.setParameter("user_id", user.getId());
		query.setString("current_time",sdf.format(timestamp));
		return query.getResultList();	
	}
	
	@Override
	public List<Reservation> currentReservations(String email) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Timestamp timestamp = new Timestamp(System.currentTimeMillis());
		Session currentSession = entityManager.unwrap(Session.class);
		Query<User> userQuery = currentSession.createQuery("from User where email =: userEmail", User.class);
		userQuery.setParameter("userEmail", email);
		User user = userQuery.getSingleResult();
	
		Query<Reservation> query = currentSession.createQuery("from Reservation r where user_id = :user_id and r.return_status in (0,2) and r.start_time <= :current_time and r.return_time IS NULL order by r.id desc ", Reservation.class);
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
		
		Query<Reservation> query = currentSession.createQuery("from Reservation r where user_id = :user_id and (r.return_status order = 0 or r.start_time >= :current_time by r.id desc ", Reservation.class);
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
		Query endReservationQuery = currentSession.createQuery("Update Reservation r set r.return_time= :current_time, r.return_status = :status, r.amount= :amount where r.id = :id ");
		endReservationQuery.setParameter("id",id.getId());
		endReservationQuery.setParameter("amount",id.getAmount());
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

	@Override
	@Transactional
	public List<Integer> startReservations(Reservation id) {
		Session currentSession = entityManager.unwrap(Session.class);
		
		Query<Reservation> reservationQuery = currentSession.createQuery("from Reservation where id =: id", Reservation.class);
		reservationQuery.setParameter("id", id.getId());
		id = reservationQuery.getSingleResult();
		System.out.println("asd" + id.getEnd_time().getTimezoneOffset());
		
		Timestamp timestamp = new java.sql.Timestamp(System.currentTimeMillis());
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Query endReservationQuery = currentSession.createQuery("Update Reservation r set r.return_status = :status where r.id = :id ");
		endReservationQuery.setParameter("id",id.getId());
		endReservationQuery.setParameter("status",2);
		endReservationQuery.executeUpdate();
		 Date date= new Date(System.currentTimeMillis());
		System.out.println("id.getEnd_time().getTime()" + (id.getEnd_time()));
		System.out.println("timestamp.getTime()" + timestamp);
		Timestamp st = new java.sql.Timestamp(id.getEnd_time().getTime() + (420 * 60* 1000));
		System.out.println("new timespta" + st);
		long milliseconds = st.getTime() - timestamp.getTime() ;
		int seconds = (int) milliseconds / 1000;
		int hours = seconds / 3600;
		int mins = seconds * 60 / 3600;
		int subtract = 0;
		subtract = ((mins - (hours * 60)) * 60);
		int extraSeconds = (int) (seconds - (hours  * 3600 )- subtract);
		
		List<Integer> result = new ArrayList();
		result.add(mins);
		result.add(extraSeconds);
		
		return result;
		
	}

	@Override
	public List<Integer> getCurrentReservationStatus(String email) {
		
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Timestamp timestamp = new Timestamp(System.currentTimeMillis());
		Session currentSession = entityManager.unwrap(Session.class);
		Query<User> userQuery = currentSession.createQuery("from User where email =: userEmail", User.class);
		userQuery.setParameter("userEmail", email);
		User user = userQuery.getSingleResult();
	
		Query<Reservation> query = currentSession.createQuery("from Reservation r where user_id = :user_id and r.return_status = 2 order by r.id desc ", Reservation.class);
		query.setParameter("user_id", user.getId());
		query.setMaxResults(1);
		List<Integer> result = new ArrayList();
		if(query.getResultList().size() > 0) {
			Reservation id =  query.getSingleResult();	
			System.out.println("id.getEnd_time().getTime()" + (id.getEnd_time()));
			Timestamp st = new java.sql.Timestamp(id.getEnd_time().getTime() + (420 * 60* 1000));
			System.out.println("id.getEnd_time().getTime()" + (st));
			long milliseconds = st.getTime() - timestamp.getTime() ;
			int seconds = (int) milliseconds / 1000;
			int hours = seconds / 3600;
			int mins = seconds * 60 / 3600;
			int subtract = 0;
			System.out.println("new timespta" + hours);
			subtract = ((mins - (hours * 60)) * 60);
			int extraSeconds = (int) (seconds - (hours  * 3600 )- subtract);
			
			
			result.add(mins);
			result.add(extraSeconds);
		}
		
		
		return result;
	} 
	
	

}

package com.rent.dao;

import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;

import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.rent.model.Membership;
import com.rent.model.Transaction;
import com.rent.model.User;

@Repository
public class UserDAO_Impl implements UserDAO {
	
	@Autowired
	private EntityManager entityManager; 
	
	@Override
	public List<User> get() {		
		Session currentSession = entityManager.unwrap(Session.class);
		Query<User> query = currentSession.createQuery("from User", User.class);
		List<User> list = query.getResultList();
		return list;
	}

	@Override
	public User get(String email) {
		Session currentSession = entityManager.unwrap(Session.class);
		Query<User> query = currentSession.createQuery("from User where email = :email ", User.class);
		query.setParameter("email", email);
		User user = query.uniqueResult();	
		return user;
	}

	@Override
	public void save(User user) {
		// TODO Auto-generated method stub
		Session currentSession = entityManager.unwrap(Session.class);
		user.setIsActive(true);
		currentSession.save(user);
	}

	@Override
	public void delete(int id) {
		// TODO Auto-generated method stub
		
	}
	
	@Override
	@Transactional
	public Date extend(String email, int months) {
		
		String price = "0";
		Session currentSession = entityManager.unwrap(Session.class);
		
		Query<User> query = currentSession.createQuery("from User where email = :email", User.class);
		query.setParameter("email", email);
		User user = query.uniqueResult();
		
		Date date = user.getMembershipEndDate();
		Calendar calendar = Calendar.getInstance();
		
		if(months <= 6) {
			calendar.setTime(date);
			calendar.add(calendar.MONTH, 6);
			date = calendar.getTime();
			Query<Membership> query2 = currentSession.createQuery("from Membership where id=1");
			Membership membership = query2.uniqueResult();
			price = membership.getPrice();}
		
		else{
			calendar.setTime(date);
			calendar.add(calendar.MONTH, 12);
			
			Query<Membership> query2 = currentSession.createQuery("from Membership where id=2");
			Membership membership = query2.uniqueResult();
			price = membership.getPrice();
			date = calendar.getTime();
		}
		
		
		Query query1 = currentSession.createQuery("UPDATE User SET membership_end_date =:enddate where email=:email");
		query1.setParameter("email", email);
		query1.setParameter("enddate", date);
		query1.executeUpdate();
		
		
		Transaction t = new Transaction();
		t.setTransaction_id("31431243134");
		t.setUser_id(user.getId());
		t.setAmount(price);
		t.setStatus(0);
		
		currentSession.save(t);
		return date;
		
	}

	
}

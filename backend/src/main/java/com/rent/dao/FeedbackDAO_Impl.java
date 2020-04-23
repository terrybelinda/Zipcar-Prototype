package com.rent.dao;

import java.util.List;

import javax.persistence.EntityManager;

import org.hibernate.query.Query;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.rent.model.Feedback;

@Repository
public class FeedbackDAO_Impl implements FeedbackDAO {
	
	@Autowired
	private EntityManager entityManager;
	
	@Override
	public List<Feedback> get(String userId) {
		Session currentSession = entityManager.unwrap(Session.class);
		Query<Feedback> query = currentSession.createQuery("from Feedback where user_id =: userId", Feedback.class);
		List<Feedback> list = query.getResultList();
		return list;
	}
	
	@Override
	public void save(Feedback feedback) {
		Session currentSession = entityManager.unwrap(Session.class);
		currentSession.save(feedback);
	}
}

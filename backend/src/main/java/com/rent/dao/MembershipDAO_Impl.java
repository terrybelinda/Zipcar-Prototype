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

import com.rent.model.Membership;
import com.rent.model.Reservation;
import com.rent.model.User;

@Repository
public class MembershipDAO_Impl implements MembershipDAO {
	
	@Autowired
	private EntityManager entityManager;

	@Override
	public List<Membership> getMembership() {
		Session currentSession = entityManager.unwrap(Session.class);
		Query<Membership> query = currentSession.createQuery("from Membership", Membership.class);
		return query.getResultList();	
	}

}

package com.rent.dao;

import java.util.List;

import javax.persistence.EntityManager;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Conjunction;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.LogicalExpression;
import org.hibernate.criterion.Restrictions;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.rent.model.Vehicle;
import com.rent.model.Location;
import com.rent.model.User;

@Repository
public class VehicleDAO_Impl implements VehicleDAO {
	
	@Autowired
	private EntityManager entityManager; 
	
	@Override
	public List<Vehicle> getByLocation(String area, String city, String state) {
		
		Session currentSession = entityManager.unwrap(Session.class);
		Query<Location> query = currentSession.createQuery("from Location where street = :area and city = :city and state= :state", Location.class);
		query.setParameter("area", area);
		query.setParameter("city", city);
		query.setParameter("state", state);
//		
		
		Location locqresult = query.uniqueResult();	
		
		
		Query<Vehicle> query1 = currentSession.createQuery("from Vehicle where rental_location = :locid ", Vehicle.class);
		query1.setParameter("locid", locqresult.getId());
		
		List<Vehicle> list = query1.getResultList();
		return list;
		}


}

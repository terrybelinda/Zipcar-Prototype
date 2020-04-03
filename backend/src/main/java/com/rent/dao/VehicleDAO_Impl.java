package com.rent.dao;

import java.util.Collections;
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
	public List<Vehicle> getByLocation(String zipcode) {
		
		Session currentSession = entityManager.unwrap(Session.class);
		Query<Location> query = currentSession.createQuery("from Location where zipcode=:zipcode", Location.class);
		query.setParameter("zipcode", zipcode);
		

		Location locqresult = query.uniqueResult();	
		
		if(locqresult != null) {
			Query<Vehicle> query1 = currentSession.createQuery("from Vehicle where rental_location = :locid and status=0", Vehicle.class);
			query1.setParameter("locid", locqresult.getId());
		
			List<Vehicle> list = query1.getResultList();
			return list;
			}
		else {
			List<Vehicle> list = Collections.<Vehicle> emptyList();
			return list;
		}
	}
	
	@Override
	public List<Vehicle> getVehicle(String type){
		
		Session currentSession = entityManager.unwrap(Session.class);
		Query<Vehicle> query = currentSession.createQuery("from Vehicle where vehicle_type = :vtype", Vehicle.class);
		query.setParameter("vtype", type);
		
		List<Vehicle> list = query.getResultList();
		return list;
	}
	
	@Override
	public List<Vehicle> vehicleRequest(String area,String city,String state, String make, String model){
		
		Session currentSession = entityManager.unwrap(Session.class);
		Query<Location> query = currentSession.createQuery("from Location where street = :area and city = :city and state= :state", Location.class);
		query.setParameter("area", area);
		query.setParameter("city", city);
		query.setParameter("state", state);

		Location locqresult = query.uniqueResult();	
		
		Query<Vehicle> query1 = currentSession.createQuery("from Vehicle where rental_location = :locid and make= :make and model=:model and status=0", Vehicle.class);
		query1.setParameter("locid", locqresult.getId());
		query1.setParameter("make", make);
		query1.setParameter("model", model);
		
		List<Vehicle> list = query1.getResultList();
		return list;
	
		
	}
	
	@Override
	public List<Vehicle> vehicleSimilar(String make, String model){
		
		Session currentSession = entityManager.unwrap(Session.class);
		Query<Vehicle> query = currentSession.createQuery("from Vehicle where make = :make and model = :model", Vehicle.class);
		query.setParameter("make", make);
		query.setParameter("model", model);
		
		Vehicle vehicleResult = query.uniqueResult();
		
		Query<Vehicle> query1 = currentSession.createQuery("from Vehicle where type=:vtype and status = 0", Vehicle.class);
		query1.setParameter("vtype", vehicleResult.getVehicle_type());
		
		List<Vehicle> list = query1.getResultList();
		return list;
	
	}

}

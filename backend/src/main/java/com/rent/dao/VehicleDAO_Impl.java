package com.rent.dao;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.HashSet;
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
import com.rent.model.Customer;
import com.rent.model.Location;
import com.rent.model.Reservation;;

@Repository
public class VehicleDAO_Impl implements VehicleDAO {
	
	@Autowired
	private EntityManager entityManager; 
	
	@Override
	public List<Vehicle> getByLocation(String zipcode, Date startdatetime, Date enddatetime) {
		//TODO
		Session currentSession = entityManager.unwrap(Session.class);
		Query<Location> query = currentSession.createQuery("from Location where zipcode=:zipcode", Location.class);
		query.setParameter("zipcode", zipcode);
		

		Location locqresult = query.uniqueResult();	
		
		if(locqresult != null) {
			
			
			Query<Vehicle> query1 = currentSession.createQuery("select v from Vehicle v JOIN "
					+ "Reservation r on v.id = r.vehicle_id and" +
					"(r.end_time >= :startdatetime and r.end_time <= :enddatetime) or " +
					"(r.start_time >= :startdatetime and r.start_time <= :enddatetime) and " +
					"(r.location_id = v.rental_location)", Vehicle.class);
			
			query1.setParameter("startdatetime",startdatetime);
			query1.setParameter("enddatetime", enddatetime);
			List<Vehicle> list1 = query1.getResultList();
			
			Query<Vehicle> query2 = currentSession.createQuery("from Vehicle v where " +
			"rental_location=:locid", Vehicle.class);
			query2.setParameter("locid",locqresult.getId());
			List<Vehicle> list2 = query2.getResultList();
			
			List<Vehicle> list3 = new ArrayList<Vehicle>();
			
			for(Vehicle temp:list2) {
				if(!list1.contains(temp)){
					list3.add(temp);}
			}
			return list1;
			}
		else {
			List<Vehicle> list = Collections.<Vehicle> emptyList();
			return list;
		}
	}
	
	@Override
	public HashSet<String> getVehicle(String type){
		
		Session currentSession = entityManager.unwrap(Session.class);
		
		if(type.isEmpty() == false) {
			Query<Vehicle> query = currentSession.createQuery("from Vehicle where vehicle_type = :vtype", Vehicle.class);
			query.setParameter("vtype", type);
		
			List<Vehicle> list = query.getResultList();
			HashSet<String> makemodel = new HashSet<String>();
			
			for(Vehicle temp:list) {
				makemodel.add(temp.getMake() + "," + temp.getModel());
			}
			
			return makemodel;}
		else {
			Query<Vehicle> query = currentSession.createQuery("select distinct make,model from Vehicle", Vehicle.class);
			
		
			List<Vehicle> list = query.getResultList();
			HashSet<String> makemodel = new HashSet<String>();
			
			for(Vehicle temp:list) {
				makemodel.add(temp.getMake() + "," + temp.getModel());
			}
			
			return makemodel;
		}
	}
	
	@Override
	public List<Vehicle> vehicleRequest(String zipcode, String make, String model){
		//TODO: add startdate and enddate
		Session currentSession = entityManager.unwrap(Session.class);
		Query<Location> query = currentSession.createQuery("from Location where zipcode = :zipcode", Location.class);
		query.setParameter("zipcode", zipcode);

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
	
	@Override
	public List<Vehicle> getAllVehicle(){
		Session currentSession = entityManager.unwrap(Session.class);
		Query<Vehicle> query = currentSession.createQuery("from Vehicle where status > 0", Vehicle.class);
		List<Vehicle> list = query.getResultList();
		return list;
	}
	
	
}

package com.rent.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;

import org.hibernate.*;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.rent.model.VehicleType;
import com.rent.model.Location;
import com.rent.model.Vehicle;

@Repository
public class AdminDAO_Impl implements AdminDAO {

	@Autowired
	private EntityManager entityManager; 
	
	@Override
	public List<VehicleType> get() {
		
		Session currentSession = entityManager.unwrap(Session.class);
		Query<VehicleType> query = currentSession.createQuery("from VehicleType where status>0", VehicleType.class);
		List<VehicleType> list = query.getResultList();
		return list;
	}
	
	@Override
	public void save(VehicleType vt) {
		
		Session currentSession = entityManager.unwrap(Session.class);
		currentSession.save(vt);
	}
	
	@Override
	@Transactional
	public void deleteVehicletype(String vtname) {
		
		Session currentSession = entityManager.unwrap(Session.class);
		Query query = currentSession.createQuery("UPDATE VehicleType SET status = 0 " + 
				"WHERE vehicle_type =:vtname");
		query.setParameter("vtname", vtname);
		query.executeUpdate();
		
		Query query1 = currentSession.createQuery("UPDATE Vehicle SET status =0 where vehicle_type=:vtname");
		query1.setParameter("vtname", vtname);
		query1.executeUpdate();
		
	}
	
	@Override
	@Transactional
	public void updateVehicletype(String vtname, String price, int hours) {
		
		Session currentSession = entityManager.unwrap(Session.class);
		Query query = currentSession.createQuery("UPDATE VehicleType SET price = :price, hours=:hours " + 
				"WHERE vehicle_type =:vtname");
		query.setParameter("vtname", vtname);
		query.setParameter("price", price);
		query.setParameter("hours", hours);
		query.executeUpdate();
		
		
	}
	
	@Override
	@Transactional
	public void saveVehicle(Vehicle vehicle) {
		
		Session currentSession = entityManager.unwrap(Session.class);
		currentSession.save(vehicle);
		
	}
	
	@Override
	@Transactional
	public void deleteVehicle(String vid) {
		
		Session currentSession = entityManager.unwrap(Session.class);
		Query query = currentSession.createQuery("UPDATE Vehicle SET status = 0 " + 
				"WHERE vid =:vid");
		query.setParameter("vid", vid);
		query.executeUpdate();
		
		
	}
	@Override
	@Transactional
	public void updateVehicle(Vehicle vehicle) {
		
		Session currentSession = entityManager.unwrap(Session.class);
		currentSession.update(vehicle);
		
	}
	
	@Override
	@Transactional
	public Location saveLocation(Location location) {
		Session currentSession = entityManager.unwrap(Session.class);
		location.setStatus(1);
		currentSession.save(location);
		return location;
	}
	
	@Override
	@Transactional
	public List<Location> getLocations() {
		Session currentSession = entityManager.unwrap(Session.class);
		Query<Location> query = currentSession.createQuery("from Location where status = 1", Location.class);
		List<Location> list = query.getResultList();
		return list;
	}
	
	@Override
	@Transactional
	public void deleteLocation(Integer id) {
		Session currentSession = entityManager.unwrap(Session.class);
		Query query = currentSession.createQuery("UPDATE Location SET status = 0 " + 
				"WHERE id =: id");
		query.setParameter("id", id);
		query.executeUpdate();
	}
	
	@Override
	@Transactional
	public void editLocation(Location location) {
		Session currentSession = entityManager.unwrap(Session.class);
		currentSession.update(location);
	}
	
}

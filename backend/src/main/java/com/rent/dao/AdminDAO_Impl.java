package com.rent.dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;import java.util.Map;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;

import org.hibernate.*;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.rent.model.VehicleType;
import com.rent.model.Vehicle;

@Repository
public class AdminDAO_Impl implements AdminDAO {

	@Autowired
	private EntityManager entityManager; 
	
	@Override
	public List<VehicleTypeGroup> get() {
		
		Session currentSession = entityManager.unwrap(Session.class);
		Query<VehicleType> query = currentSession.createQuery("from VehicleType where status>0", VehicleType.class);
		List<VehicleType> list = query.getResultList();
		HashMap<String, VehicleTypeGroup> map = new HashMap();
		List<VehicleTypeGroup> result = new ArrayList();
		for(VehicleType type : list) {
			if(map.containsKey(type.getVehicle_type())) {
				VehicleTypeGroup entry = map.get(type.getVehicle_type());
				entry.addInHourList(type.getHours());
				entry.addInPriceList(type.getPrice());
				map.put(type.getVehicle_type(), entry);
			} else {
				VehicleTypeGroup entry = new VehicleTypeGroup(type.getVehicle_type());
				entry.addInHourList(type.getHours());
				entry.addInPriceList(type.getPrice());
				
				map.put(type.getVehicle_type(), entry);
			}
			
			
		}
		
		Iterator hmIterator = map.entrySet().iterator(); 
		
		while (hmIterator.hasNext()) { 
			Map.Entry mapElement = (Map.Entry)hmIterator.next();
			VehicleTypeGroup entry = (VehicleTypeGroup)mapElement.getValue();
			result.add(entry);
		}
		return result;
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
	
}


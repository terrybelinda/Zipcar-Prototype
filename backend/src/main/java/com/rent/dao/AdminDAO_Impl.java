package com.rent.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;

import org.hibernate.Session;
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
	public List<VehicleType> get() {
		
		Session currentSession = entityManager.unwrap(Session.class);
		Query<VehicleType> query = currentSession.createQuery("from VehicleType", VehicleType.class);
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
		Query query = currentSession.createQuery("UPDATE VehicleType SET status = 1 " + 
				"WHERE vehicle_type =:vtname");
		query.setParameter("vtname", vtname);
		query.executeUpdate();
		
		Query query1 = currentSession.createQuery("UPDATE Vehicle SET status =1 where vehicle_type=:vtname");
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
	
}

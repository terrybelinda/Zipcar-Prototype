package com.rent.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;

import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.rent.model.VehicleType;

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
	public void deleteVehicletype(int id) {
		
		Session currentSession = entityManager.unwrap(Session.class);
		Query query = currentSession.createQuery("DELETE FROM VehicleType WHERE id=:id");
		query.setParameter("id", id);
		query.executeUpdate();
		
	}
	
}

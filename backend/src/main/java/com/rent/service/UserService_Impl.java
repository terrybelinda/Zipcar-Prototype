package com.rent.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.rent.dao.UserDAO;
import com.rent.model.User;

@Service
public class UserService_Impl implements UserService{

	@Autowired
	UserDAO userDAO;
	
	@Transactional
	@Override
	public List<User> get() {
		return userDAO.get();
	}

	@Transactional
	@Override
	public User get(String email) {		
		return userDAO.get(email);
	}

	@Transactional
	@Override
	public void save(User user) {
		userDAO.save(user);
	}
	
	
	@Transactional
	@Override
	public void delete(int id) {
		// TODO Auto-generated method stub
		
	}
	
	@Override
	public void extend(String email, int months) {
		userDAO.extend(email, months);
	}

}

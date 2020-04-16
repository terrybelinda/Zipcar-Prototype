package com.rent.dao;

import java.util.List;

import com.rent.model.User;

public interface UserDAO {
	
	List<User> get();
	
	User get(String email);
	
	void save(User user);
	
	void delete(int id);
}

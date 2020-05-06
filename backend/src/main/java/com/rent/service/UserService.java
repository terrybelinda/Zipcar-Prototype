package com.rent.service;

import java.util.List;

import com.rent.model.User;

public interface UserService {

	List<User> get();
	
	User get(String email);
	
	void save(User user);
	
	void delete(int id);

	public void extend(String email, int months);
}

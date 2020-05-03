package com.rent.dao;

import java.util.List;

import com.rent.model.Feedback;

public interface FeedbackDAO {
	
	List<Feedback> get(Integer userId);
	
	void save(Feedback feedback);
}

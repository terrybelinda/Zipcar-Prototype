package com.rent.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rent.dao.FeedbackDAO;
import com.rent.model.Feedback;

@Service
public class FeedbackService_Impl implements FeedbackService {
	
	@Autowired
	FeedbackDAO feedbackDAO;
	
	@Transactional
	@Override
	public List<Feedback> get(String userId) {
		return feedbackDAO.get(userId);
	}
	
	@Transactional
	@Override
	public void save(Feedback feedback) {
		feedbackDAO.save(feedback);
	}
}

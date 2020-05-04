package com.rent.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rent.model.Feedback;
import com.rent.service.FeedbackService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class FeedbackController {
	
	@Autowired
	private FeedbackService feedbackService;
	
	@PostMapping("/feedback")
	public String sendFeedback(@RequestBody Feedback feedback) {
		feedbackService.save(feedback);
		return "Success";
	}
}

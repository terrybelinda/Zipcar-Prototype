package com.rent.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.rent.model.User;
import com.rent.model.Vehicle;
import com.rent.model.Extension;
import com.rent.model.Login;
import com.rent.service.UserService;
import com.rent.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@PostMapping("/login")
	public User login(@RequestBody Login user) {
		return userService.get(user.getEmail());
	}
	
	@PostMapping("/signup")
	public String signup(@RequestBody User user) {
		userService.save(user);
		return "Success";
	}
	
	@PostMapping("/extendmembership")
	public String extend(@RequestBody Extension ext) {
		
		userService.extend(ext.getEmail(), ext.getMonths());
		return "success";
		
	}
	
	@GetMapping("/viewuserbyemail")
	public User getByEmail(@RequestParam String email) {
		return userService.get(email);
		
	
		
	}
	
}

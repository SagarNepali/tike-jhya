package com.tikejhya.user.dao;

import java.util.List;

import com.tikejhya.user.model.User;
import com.tikejhya.user.model.UserForm;

public interface UserDAO {
	public String getUsername();
	public User getUserDetails(String username);
	
	public List<UserForm> getAllUserInfo();

}

	
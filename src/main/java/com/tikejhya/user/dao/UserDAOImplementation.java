package com.tikejhya.user.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.sql.DataSource;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import com.tikejhya.user.model.User;
import com.tikejhya.user.model.UserForm;

public class UserDAOImplementation implements UserDAO {

	private JdbcTemplate jdbcTemplate;

	public UserDAOImplementation(DataSource dataSource) {
		jdbcTemplate = new JdbcTemplate(dataSource);
	}


	@Override
	public String getUsername() {
		String userName = null;
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

		if (principal instanceof UserDetails) {
			userName = ((UserDetails) principal).getUsername();
		} else {
			userName = principal.toString();
		}
		return userName;
	}

	@Override
	public User getUserDetails(String username) {
		String methodName = new Object() {
		}.getClass().getEnclosingMethod().getName();
		System.out.println(this.getClass().getSimpleName() + ":" + methodName + " method invoked.");
		User aUser = new User();
		String sqlQuery = "SELECT * from users where username = ?";
		Connection con = null;
		try {
			con = jdbcTemplate.getDataSource().getConnection();
			PreparedStatement ps = con.prepareStatement(sqlQuery);
			ps.setString(1, username);
			ResultSet rs = ps.executeQuery();
			if (rs != null) {
				rs.next();
				aUser.setUsername(rs.getString("username"));
				aUser.setSolId(rs.getString("sol_id"));
				aUser.setAuthenticated(true);
			} else {
				return null;
			}
		} catch (Exception e) {
			return null;
		} finally {
			try {
				con.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		return aUser;
	}


	@Override
	public List<UserForm> getAllUserInfo() {
	
		List<UserForm> userList = new ArrayList<>();
		
		String sql = "SELECT * FROM users";
		
		try{
			PreparedStatement ps = jdbcTemplate.getDataSource().getConnection().prepareStatement(sql);
			
			ResultSet rs = ps.executeQuery();
			 
			while(rs.next()){
				UserForm user = new UserForm();
				user.setUsername(rs.getString("username"));
				user.setFirstName(rs.getString("first_name"));
				user.setMiddleName(rs.getString("middle_name"));
				user.setLastName(rs.getString("last_name"));
				user.setStatus(rs.getBoolean("status"));
				user.setEmailId(rs.getString("email_id"));
				user.setContactNo(rs.getString("contact_no"));
				user.setEmergencyContactNo(rs.getString("emergency_contact_no"));
				user.setAddress(rs.getString("address"));
				user.setDesignation(rs.getString("designation"));
				user.setAddedDate(rs.getDate("added_date"));
				user.setNotes(rs.getString("notes"));
				
				userList.add(user);
			}
			
		}catch(SQLException e){
			e.printStackTrace();
		}
		
		return userList;
	}

	

}
package com.tikejhya.user.model;

public class User {
	private int id;	
	private String username;	
	private String password;
	private String solId;
	private boolean authenticated;
	
	private String notes;
	private String enabled;
	private String firstName;
	private String middleName;
	private String lastName;
	private String email;
	private String mobileContactNo;
	
	
	public User() {
		super();		
		this.username = "";
		this.password = "";
		this.solId = "";
		this.authenticated = false;		
	}
	
	public User(int id, String username, String password, String solId, boolean authenticated) {
		super();
		this.id = id;
		this.username = username;
		this.password = password;
		this.solId = solId;
		this.authenticated = authenticated;
	}	
	public int getId() {
		return id;
	}
	public void setId(int id){
		this.id = id;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}	
	public String getSolId() {
		return solId;
	}
	public void setSolId(String solId) {
		this.solId = solId;
	}
	public boolean isAuthenticated() {
		return authenticated;
	}
	public void setAuthenticated(boolean authenticated) {
		this.authenticated = authenticated;
	}
	public void userDetails(){
		System.out.println("User ID: " + username + " Password: **** .");
	}

	public String getNotes() {
		return notes;
	}

	public void setNotes(String notes) {
		this.notes = notes;
	}

	public String getEnabled() {
		return enabled;
	}

	public void setEnabled(String enabled) {
		this.enabled = enabled;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getMiddleName() {
		return middleName;
	}

	public void setMiddleName(String middleName) {
		this.middleName = middleName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getMobileContactNo() {
		return mobileContactNo;
	}

	public void setMobileContactNo(String mobileContactNo) {
		this.mobileContactNo = mobileContactNo;
	}

	
}

package com.tikejhya.user.model;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonProperty;

public class UserForm {
	@JsonProperty("user-role")
	private String userRole;

	@JsonProperty("first-name")
	private String firstName;
	@JsonProperty("middle-name")
	private String middleName;
	@JsonProperty("last-name")
	private String lastName;

	@JsonProperty("designation")
	private String designation;

	@JsonProperty("contact-no")
	private String contactNo;
	@JsonProperty("email-id")
	private String emailId;

	@JsonProperty("username")
	private String username;
	@JsonProperty("password")
	private String password;

	@JsonProperty("status")
	private boolean status;
	@JsonProperty("eergency-contact-no")
	private String emergencyContactNo;
	@JsonProperty("address")
	private String address;
	@JsonProperty("added-date")
	private Date addedDate;
	@JsonProperty("modified-date")
	private Date modifiedDate;
	@JsonProperty("notes")
	private String notes;
	
	
	
	public UserForm() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
	public UserForm(String userRole, String firstName, String middleName, String lastName, String designation,
			String contactNo, String emailId, String username, String password, boolean status,
			String emergencyContactNo, String address, Date addedDate, Date modifiedDate, String notes) {
		super();
		this.userRole = userRole;
		this.firstName = firstName;
		this.middleName = middleName;
		this.lastName = lastName;
		this.designation = designation;
		this.contactNo = contactNo;
		this.emailId = emailId;
		this.username = username;
		this.password = password;
		this.status = status;
		this.emergencyContactNo = emergencyContactNo;
		this.address = address;
		this.addedDate = addedDate;
		this.modifiedDate = modifiedDate;
		this.notes = notes;
	}


	public String getUserRole() {
		return userRole;
	}
	public void setUserRole(String userRole) {
		this.userRole = userRole;
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
	public String getDesignation() {
		return designation;
	}
	public void setDesignation(String designation) {
		this.designation = designation;
	}
	public String getContactNo() {
		return contactNo;
	}
	public void setContactNo(String contactNo) {
		this.contactNo = contactNo;
	}
	public String getEmailId() {
		return emailId;
	}
	public void setEmailId(String emailId) {
		this.emailId = emailId;
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
	public boolean getStatus() {
		return status;
	}
	public void setStatus(boolean status) {
		this.status = status;
	}
	public String getEmergencyContactNo() {
		return emergencyContactNo;
	}
	public void setEmergencyContactNo(String emergencyContactNo) {
		this.emergencyContactNo = emergencyContactNo;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public Date getAddedDate() {
		return addedDate;
	}
	public void setAddedDate(Date addedDate) {
		this.addedDate = addedDate;
	}
	public Date getModifiedDate() {
		return modifiedDate;
	}
	public void setModifiedDate(Date modifiedDate) {
		this.modifiedDate = modifiedDate;
	}
	public String getNotes() {
		return notes;
	}
	public void setNotes(String notes) {
		this.notes = notes;
	}
	
	
}

package com.tikejhya.category.model;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Category {

	@JsonProperty("code")
	private String code;

	private String description;

	private Date addedDate;
	
	private Date modifiedDate;
	
	private boolean status;

	public Category() {
		super();
		
	}

	public Category(String categoryCode, String description, Date addedDate, Date modifiedDate, boolean status) {
		super();
		this.code = categoryCode;
		this.description = description;
		this.addedDate = addedDate;
		this.modifiedDate = modifiedDate;
		this.status = status;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String categoryCode) {
		this.code = categoryCode;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
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

	public boolean isStatus() {
		return status;
	}

	public void setStatus(boolean status) {
		this.status = status;
	}
	
	
}

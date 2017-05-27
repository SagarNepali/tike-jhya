package com.trustaml.service.category.model;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties
public class CommonEnumField {

	private String enumcode;

	private String description;

	private Date disabled;

	private Boolean status;

	public CommonEnumField() {

	}

	public CommonEnumField(String enumcode, String description, Date disabled, Boolean status) {
		super();
		this.enumcode = enumcode;
		this.description = description;
		this.disabled = disabled;
		this.status = status;
	}

	public String getEnumcode() {
		return enumcode;
	}

	public void setEnumcode(String enumcode) {
		this.enumcode = enumcode;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Date getDisabled() {
		return disabled;
	}

	public void setDisabled(Date disabled) {
		this.disabled = disabled;
	}

	public Boolean getStatus() {
		return status;
	}

	public void setStatus(Boolean status) {
		this.status = status;
	}

}

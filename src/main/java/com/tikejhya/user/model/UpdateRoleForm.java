package com.tikejhya.user.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class UpdateRoleForm {

	@JsonProperty("old_role")
	private String oldRole;
	
	@JsonProperty("new_role")
	private String newRole;
	
	@JsonProperty("reason")
	private String reason;
	
	@JsonProperty("username")
	private String username;
	
	public UpdateRoleForm(){
		this.newRole= "";
		this.username="";
		this.reason="";
		this.oldRole = "";
	}
	
	public UpdateRoleForm(String username, String newRole, String oldRole, String reason){
		this.username = username;
		this.newRole= newRole;
		this.oldRole = oldRole;
		this.reason= reason;
	}

	public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getOldRole() {
		return oldRole;
	}

	public void setOldRole(String oldRole) {
		this.oldRole = oldRole;
	}

	public String getNewRole() {
		return newRole;
	}

	public void setNewRole(String newRole) {
		this.newRole = newRole;
	}
	
}

package com.trustaml.service.category.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.trustaml.service.identity.model.User;

public class Category {
	@JsonProperty("field")
	private List<CommonEnumField> listCommonEnumField;

	@JsonProperty("table")
	private String tableName;

	@JsonProperty("reason")
	private String reason;

	@JsonProperty("risk_table")
	private String riskTable;

	@JsonProperty("user")
	private User user;

	public List<CommonEnumField> getListCommonEnumField() {
		return listCommonEnumField;
	}

	public void setListCommonEnumField(List<CommonEnumField> listCommonEnumField) {
		this.listCommonEnumField = listCommonEnumField;
	}

	public String getTableName() {
		return tableName;
	}

	public void setTableName(String tableName) {
		this.tableName = tableName;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}

	public String getReason() {
		return reason;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public String getRiskTable() {
		return riskTable;
	}

	public void setRiskTable(String riskTable) {
		this.riskTable = riskTable;
	}

}

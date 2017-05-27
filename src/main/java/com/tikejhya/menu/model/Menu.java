package com.tikejhya.menu.model;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.tikejhya.category.model.Category;


public class Menu {

	@JsonProperty("id")
	private long id;
	@JsonProperty("item")
	private String item;
	@JsonProperty("item-code")
	private String itemCode;
	@JsonProperty("category")
	private Category category;
	@JsonProperty("description")
	private String description;
	private Date addedDate;
	private Date modifiedDate;
	@JsonProperty("status")
	private boolean status;
	private String notes;
	@JsonProperty("rate")
	private int rate;
	
	public Menu() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Menu(long id, String item, String itemCode, Category category, String description, Date addedDate,
			Date modifiedDate, boolean status, String notes, int rate) {
		super();
		this.id = id;
		this.item = item;
		this.itemCode = itemCode;
		this.category = category;
		this.description = description;
		this.addedDate = addedDate;
		this.modifiedDate = modifiedDate;
		this.status = status;
		this.notes = notes;
		this.rate = rate;
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getItem() {
		return item;
	}
	public void setItem(String item) {
		this.item = item;
	}
	public String getItemCode() {
		return itemCode;
	}
	public void setItemCode(String itemCode) {
		this.itemCode = itemCode;
	}
	public Category getCategory() {
		return category;
	}
	public void setCategory(Category category) {
		this.category = category;
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
	public String getNotes() {
		return notes;
	}
	public void setNotes(String notes) {
		this.notes = notes;
	}
	
	
	public int getRate() {
		return rate;
	}
	public void setRate(int rate) {
		this.rate = rate;
	}
	@Override
	public String toString() {
		return "Menu [id=" + id + ", item=" + item + ", itemCode=" + itemCode + ", category=" + category
				+ ", description=" + description + ", addedDate=" + addedDate + ", modifiedDate=" + modifiedDate
				+ ", status=" + status + ", notes=" + notes + "]";
	}
	
	
	
	
	
	
}

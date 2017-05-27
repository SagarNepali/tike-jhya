package com.tikejhya.util;

public class SqlConstants {

	public static final String UPDATE_MENU = "UPDATE MENU SET item=?, item_code=?, description=?,category_code=?,status=?,notes=?,rate=?,modified_date=? "
			+ " WHERE id=?";
	
	public static final String MENU_CHANGE_STATUS = "UPDATE MENU set status=? WHERE id=?";
}

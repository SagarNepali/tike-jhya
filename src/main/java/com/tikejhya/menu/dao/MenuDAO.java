package com.tikejhya.menu.dao;

import java.util.List;

import com.tikejhya.menu.model.Menu;

public interface MenuDAO {

	List<Menu> getAllMenu();
	int insert(Menu menu);
	int update(Menu menu);
	int changeStatus(long id,boolean status);
	Menu getById(long id);
	
}

package com.tikejhya.menu.dao;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.sql.DataSource;

import org.springframework.jdbc.core.JdbcTemplate;

import com.mysql.cj.jdbc.PreparedStatement;
import com.tikejhya.category.model.Category;
import com.tikejhya.menu.model.Menu;
import com.tikejhya.util.SqlConstants;

public class MenuDAOImpl implements MenuDAO {

	private JdbcTemplate jdbcTemplate;

	public MenuDAOImpl(DataSource dataSource) {

		jdbcTemplate = new JdbcTemplate(dataSource);
	}

	@Override
	public List<Menu> getAllMenu() {
		List<Menu> menus = new ArrayList<>();

		Connection con = null;
		PreparedStatement ps = null;
		ResultSet rs = null;

		String sql = "SELECT * FROM MENU";
		try {
			con = jdbcTemplate.getDataSource().getConnection();
			ps = (PreparedStatement) con.prepareStatement(sql);
			rs = ps.executeQuery();
			while (rs.next()) {
				Menu menu = new Menu();
				Category category = new Category();

				menu.setItem(rs.getString("item"));
				menu.setItemCode(rs.getString("item_code"));
				category.setCode(rs.getString("category_code"));
				menu.setCategory(category);
				menu.setStatus(rs.getBoolean("status"));
				menu.setDescription(rs.getString("description"));
				menu.setAddedDate(rs.getDate("added_date"));
				menu.setModifiedDate(rs.getDate("modified_date"));
				menu.setNotes(rs.getString("notes"));
				menu.setId(rs.getLong("id"));
				menu.setRate(rs.getInt("rate"));
				menus.add(menu);
			}

		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			try {
				rs.close();
				ps.close();
				con.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}

		return menus;
	}

	@Override
	public int insert(Menu menu) {
		Connection connection = null;
		PreparedStatement ps = null;
		int i = 0;
		final String sql = "INSERT INTO menu (item,description,category_code,item_code,status,notes,rate)"
				+ " VALUES(?,?,?,?,?,?,?)";
		try {

			connection = jdbcTemplate.getDataSource().getConnection();
			ps = (PreparedStatement) connection.prepareStatement(sql);

			ps.setString(1, menu.getItem());
			ps.setString(2, menu.getDescription());
			ps.setString(3, menu.getCategory().getCode());
			ps.setString(4, menu.getItemCode());
			ps.setBoolean(5, menu.isStatus());
			ps.setString(6, menu.getNotes());
			ps.setInt(7, menu.getRate());

			i = ps.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			try {
				connection.close();

				ps.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}

		}
		return i;
	}

	@Override
	public int update(Menu menu) {
		
		String methodName = new Object() {
		}.getClass().getEnclosingMethod().getName();
		System.out.println(this.getClass().getSimpleName() + ":" + methodName + " method invoked.");
		
		Connection connection = null;
		PreparedStatement ps = null;
		int i = 0;
		try{
			
			connection=jdbcTemplate.getDataSource().getConnection();
			
			ps = (PreparedStatement) connection.prepareStatement(SqlConstants.UPDATE_MENU);
			ps.setString(1, menu.getItem());
			ps.setString(2, menu.getItemCode());
			ps.setString(3, menu.getDescription());
			ps.setString(4, menu.getCategory().getCode());
			ps.setBoolean(5, menu.isStatus());
			ps.setString(6, menu.getNotes());
			ps.setInt(7, menu.getRate());
			ps.setTimestamp(8, new Timestamp(new Date().getTime()));
			ps.setLong(9, menu.getId());
			
			i = ps.executeUpdate();
			
		}catch(SQLException e){
			e.printStackTrace();
		}finally {
			try{
				connection.close();
				ps.close();
			}catch(SQLException e){
				e.printStackTrace();
			}
		}
		return i;
	}

	@Override
	public Menu getById(long id) {

		for (Menu menu : getAllMenu()) {
			if (menu.getId() == id) {
				return menu;
			}
		}
		return null;
	}

	@Override
	public int changeStatus(long id, boolean status) {
		
		Connection connection = null;
		PreparedStatement ps = null;
		int i = 0;
		try{
			connection = jdbcTemplate.getDataSource().getConnection();
			ps = (PreparedStatement) connection.prepareStatement(SqlConstants.MENU_CHANGE_STATUS);
			ps.setBoolean(1, status);
			ps.setLong(2, id);
			
			i = ps.executeUpdate();
			
		}catch(SQLException e){
			e.printStackTrace();
		}finally{
			try{
				connection.close();
				ps.close();
			}catch(SQLException e){
				e.printStackTrace();
			}
		}
		return i;
	}

}

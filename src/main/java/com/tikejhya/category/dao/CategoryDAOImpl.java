package com.tikejhya.category.dao;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.sql.DataSource;

import org.springframework.jdbc.core.JdbcTemplate;

import com.tikejhya.category.model.Category;

public class CategoryDAOImpl implements CategoryDAO {

	private JdbcTemplate jdbcTemplate;

	public CategoryDAOImpl(DataSource dataSource) {
		jdbcTemplate = new JdbcTemplate(dataSource);

	}

	@Override
	public List<Category> getAllCategories() {

		List<Category> categories = new ArrayList<>();

		String sql = "SELECT * FROM category";

		Connection con = null;
		ResultSet rs = null;
		java.sql.PreparedStatement ps = null;
		try {
			con = jdbcTemplate.getDataSource().getConnection();
			ps = con.prepareStatement(sql);
			rs = ps.executeQuery();

			while (rs.next()) {
				Category category = new Category();

				category.setAddedDate(rs.getDate("added_date"));
				category.setModifiedDate(rs.getDate("modified_date"));
				category.setStatus(rs.getBoolean("status"));
				category.setCode(rs.getString("code"));
				category.setDescription(rs.getString("description"));

				categories.add(category);
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

		return categories;
	}

}

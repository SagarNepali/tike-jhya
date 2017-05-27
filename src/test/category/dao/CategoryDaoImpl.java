package com.trustaml.service.category.dao;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.inject.Inject;

import com.trustaml.service.category.model.CommonEnumField;
import com.trustaml.service.common.database.DBConnection;

public class CategoryDaoImpl {

	@Inject
	DBConnection dbConnection;

	public List<Object> getAllEnumField(String table) throws SQLException {
		String sql = "select * from " + table;
		List<Object> list = new ArrayList<>();
		Connection con = dbConnection.getConnection();
		Statement stmt = con.createStatement();
		ResultSet rs = stmt.executeQuery(sql);
		while (rs.next()) {
			CommonEnumField field = new CommonEnumField(rs.getString("enum_code"), rs.getString("enum_description"),
					rs.getDate("disable_date"), rs.getBoolean("enabled"));
			list.add(field);
		}
		con.close();
		stmt.close();
		return list;
	}

	public void updateEnums(String table, CommonEnumField commonEnumField) throws SQLException {
		String sql;
		if (commonEnumField.getStatus()) {
			sql = "update " + table + " set enabled=?, enum_description=? where enum_code=?";
		} else {
			sql = "update " + table + " set  enabled=?, disable_date=?, enum_description=? where enum_code=?";
		}
		Connection con = dbConnection.getConnection();
		PreparedStatement ps = con.prepareStatement(sql);

		ps.setBoolean(1, commonEnumField.getStatus());
		if (commonEnumField.getStatus()) {
			ps.setString(2, commonEnumField.getDescription());
			ps.setString(3, commonEnumField.getEnumcode());

		} else {
			ps.setDate(2, new java.sql.Date(new Date().getTime()));
			ps.setString(3, commonEnumField.getDescription());
			ps.setString(4, commonEnumField.getEnumcode());
		}
		ps.executeUpdate();
		con.close();
		ps.close();

	}

	public void insertEnumsUpdate(String table, CommonEnumField commonEnumField, String reason, String maker,
			String checker) throws SQLException {
		String sql = "";
		Connection con = dbConnection.getConnection();
		if (commonEnumField.getStatus()) {
			sql = "insert into " + table
					+ "_update(enum_code,enum_description, enabled, maker,checker,approved,update_date,approved_date, reason) values(?,?,?,?,?,?,?,?,?)";
		} else {
			sql = "insert into " + table
					+ "_update(enum_code,enum_description, enabled,disable_date, maker,checker,approved,update_date,approved_date, reason) values(?,?,?,?,?,?,?,?,?,?)";
		}
		PreparedStatement ps = con.prepareStatement(sql);
		ps.setString(1, commonEnumField.getEnumcode());
		ps.setString(2, commonEnumField.getDescription());
		ps.setBoolean(3, commonEnumField.getStatus());
		if (commonEnumField.getStatus()) {
			ps.setString(4, maker);
			ps.setString(5, checker);
			ps.setBoolean(6, true);
			ps.setDate(7, new java.sql.Date(new Date().getTime()));
			ps.setDate(8, new java.sql.Date(new Date().getTime()));
			ps.setString(9, "New Reason");
		} else {
			ps.setDate(4, new java.sql.Date(new Date().getTime()));
			ps.setString(5, maker);
			ps.setString(6, checker);
			ps.setBoolean(7, true);
			ps.setDate(8, new java.sql.Date(new Date().getTime()));
			ps.setDate(9, new java.sql.Date(new Date().getTime()));
			ps.setString(10, "New Reason");
		}
		ps.executeUpdate();
		con.close();
		ps.close();
	}

	public Object getEnumField() throws SQLException {
		Connection con = dbConnection.getConnection();
		String result = "";
		CallableStatement stmt = con.prepareCall("{call enum_table_name(?)}");
		stmt.registerOutParameter(1, java.sql.Types.VARCHAR);
		stmt.executeUpdate();
		result = stmt.getString(1);
		con.close();
		stmt.close();
		return result;
	}

	public void saveEnum(String table, CommonEnumField commonEnumField) throws SQLException {
		Connection con = dbConnection.getConnection();
		String sql;
		if (commonEnumField.getStatus()) {
			sql = "INSERT INTO " + table + " (enum_code, enabled, enum_description) values(?,?,?)";
		} else {
			sql = "INSERT INTO " + table + " (enum_code, enabled, disable_date, enum_description) values(?,?,?,?)";
		}
		PreparedStatement ps = con.prepareStatement(sql);
		ps.setString(1, commonEnumField.getEnumcode());
		ps.setBoolean(2, commonEnumField.getStatus());
		if (commonEnumField.getStatus()) {
			ps.setString(3, commonEnumField.getDescription());
		} else {
			ps.setDate(3, new java.sql.Date(new Date().getTime()));
			ps.setString(4, commonEnumField.getDescription());
		}
		ps.executeUpdate();
		con.close();
		ps.close();
	}

	public void saveRiskValue(String riskTable, CommonEnumField commonField) throws SQLException {
		Connection con = dbConnection.getConnection();
		String sql = "INSERT INTO " + riskTable + " (name, risk_value_taml) values(?,?)";
		PreparedStatement ps = con.prepareStatement(sql);
		ps.setString(1, commonField.getEnumcode());
		ps.setInt(2, 0);
		ps.executeUpdate();
		con.close();
		ps.close();

	}

	public boolean checkIfEnumCodeExists(String tableName, String enumCode) throws SQLException {
		String sql = "select * from " + tableName + " where enum_code = ?";
		Connection conn = dbConnection.getConnection();
		PreparedStatement ps = conn.prepareStatement(sql);
		ps.setString(1, enumCode);
		ResultSet rs = ps.executeQuery();
		while (rs.next()) {
			conn.close();
			return true;

		}
		conn.close();
		return false;

	}
}

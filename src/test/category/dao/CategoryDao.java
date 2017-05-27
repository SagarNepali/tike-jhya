package com.trustaml.service.category.dao;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

import javax.ejb.Stateless;
import javax.inject.Inject;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.trustaml.service.category.model.Category;
import com.trustaml.service.category.model.CommonEnumField;

@Stateless
public class CategoryDao {

	@Inject
	CategoryDaoImpl categoryDaoImpl;

	public Object getEnumField() throws SQLException {
		return categoryDaoImpl.getEnumField();
	}

	public List<Object> getAllEnumField(String tableName) throws SQLException {
		return categoryDaoImpl.getAllEnumField(tableName);
	}

	public void updateEnums(String table, List<CommonEnumField> listCommonEnumField) throws SQLException {
		for (CommonEnumField commonEnumField : listCommonEnumField) {
			categoryDaoImpl.updateEnums(table, commonEnumField);
		}
	}

	public void insertEnumsUpdate(String table, List<CommonEnumField> listCommonEnumField, String reason, String maker,
			String checker) throws SQLException {
		for (CommonEnumField commonEnumField : listCommonEnumField) {
			categoryDaoImpl.insertEnumsUpdate(table, commonEnumField, reason, maker, checker);
		}
	}

	public void UpdateEnum(String json) throws JsonParseException, JsonMappingException, IOException, SQLException {
		ObjectMapper mapper = new ObjectMapper();
		Category category = mapper.readValue(json, Category.class);
		updateEnums(category.getTableName(), category.getListCommonEnumField());
		insertEnumsUpdate(category.getTableName(), category.getListCommonEnumField(), category.getReason(),
				category.getUser().getUserName(), category.getUser().getUserName());

	}

	public void saveEnum(String json) throws JsonParseException, JsonMappingException, IOException, SQLException {
		ObjectMapper mapper = new ObjectMapper();
		Category category = mapper.readValue(json, Category.class);
		for (CommonEnumField commonField : category.getListCommonEnumField()) {
			categoryDaoImpl.saveEnum(category.getTableName(), commonField);
			if (category.getRiskTable() != "" && !category.getRiskTable().isEmpty()
					&& !category.getRiskTable().equals("null")) {
				categoryDaoImpl.saveRiskValue(category.getRiskTable(), commonField);
			}
		}

	}

	public boolean checkIfEnumCodeExists(String tableName, String enumCode) throws SQLException {
		return categoryDaoImpl.checkIfEnumCodeExists(tableName, enumCode);
	}
}

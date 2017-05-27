package com.trustaml.service.category.controller;

import java.io.IOException;
import java.sql.SQLException;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.trustaml.service.category.dao.CategoryDao;
import com.trustaml.service.common.exception.type.TrustAmlEmptyJSONException;
import com.trustaml.service.common.service.ResponseReturn;

@Path("/category")
public class CategoryRestfulService {

	@Inject
	CategoryDao categoryDao;

	@GET
	@Path("/{table-name}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAllCategory(@PathParam("table-name") String tableName) throws SQLException {
		return ResponseReturn.sucess(categoryDao.getAllEnumField(tableName));

	}

	@GET
	@Path("/enum-code/{table-name}/{enum-code}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response checkIfEnumCodeExists(@PathParam("table-name") String tableName,
			@PathParam("enum-code") String enumCode) throws SQLException {
		return ResponseReturn.sucess(categoryDao.checkIfEnumCodeExists(tableName, enumCode));

	}

	@GET
	@Path("/all-tables")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAllTables() throws SQLException {
		return ResponseReturn.sucess(categoryDao.getEnumField());

	}

	@PUT
	@Consumes(MediaType.APPLICATION_JSON)
	public Response updateCategory(String json)
			throws JsonParseException, JsonMappingException, IOException, SQLException, TrustAmlEmptyJSONException {
		if (!json.isEmpty()) {
			categoryDao.UpdateEnum(json);
			return ResponseReturn.sucess("update successful");
		} else {
			throw new TrustAmlEmptyJSONException("json is empty");
		}

	}

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response saveCategory(String json)
			throws JsonParseException, JsonMappingException, IOException, SQLException, TrustAmlEmptyJSONException {
		if (!json.isEmpty()) {
			categoryDao.saveEnum(json);
			return ResponseReturn.sucess("save successful");
		} else {
			throw new TrustAmlEmptyJSONException("json is empty");
		}
	}

}

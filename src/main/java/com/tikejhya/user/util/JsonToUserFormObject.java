package com.tikejhya.user.util;

import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tikejhya.user.model.UserForm;

public class JsonToUserFormObject {
	
	public final static UserForm getUserFormObject(String jsonString){
		System.out.println("Json String received: " + jsonString);
		ObjectMapper mapper=new ObjectMapper();
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		mapper.setDateFormat(df);
		UserForm userForm=new UserForm();
		try {
			    JsonNode jsonNode=mapper.readValue(jsonString,JsonNode.class);
				JsonNode screening=jsonNode.get("add-user-info");
				userForm = mapper.treeToValue(screening, UserForm.class);
		} catch (JsonParseException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return userForm;
	}
}

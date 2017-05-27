package com.tikejhya.user.util;

import java.io.IOException;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tikejhya.user.model.PasswordForm;

public class JsonToPasswordFormObject {
	
	public final static PasswordForm getPasswordFormObject(String jsonString){		
		ObjectMapper mapper=new ObjectMapper();		
		PasswordForm passwordForm=new PasswordForm();
		try {
			    JsonNode jsonNode=mapper.readValue(jsonString,JsonNode.class);
				JsonNode screening=jsonNode.get("password-change-info");
				passwordForm = mapper.treeToValue(screening, PasswordForm.class);
		} catch (JsonParseException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return passwordForm;
	}
}

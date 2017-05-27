package com.tikejhya.enums.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.tikejhya.user.dao.UserDAO;


@Controller
public class EnumController {

	@Autowired
	UserDAO userDAO;
	
	@RequestMapping(value="/enum/details")
	public String detailCategory(@RequestParam("table") String table){
		return "category/category-value-list";
	}
	
//	@RequestMapping(value="/category/list", method=RequestMethod.GET)
//	public String insertForm(){
//		return "category/category-list";
//	}
	
	/*
	@RequestMapping(value="/enum/getTable", method=RequestMethod.POST, produces="application/json")
	@ResponseBody
	public String jsonTableData(@RequestParam("table") String table){
		String json = RestConsume.getRestWithParm(RestURIConstants.CATEGORY_REST_URL, table);
		return json;
	}
	@RequestMapping(value="/enum/code-validate", method=RequestMethod.POST,produces="application/json")
	@ResponseBody
	public Boolean validateEnumCode(@RequestParam("enum_code") String code, @RequestParam("table") String table){
		String json;
		try{
			 json = RestConsume.getRestWithParm(RestURIConstants.CATEGORY_REST_URL+"/enum-code",table +"/"+code);
			 
			 System.out.println(json);
			 if(json.equals("true"))
				 return false;
			 else
				 return true;
		}catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}
	
	@RequestMapping(value="/enum/getEnumTable", method=RequestMethod.POST)
	@ResponseBody
	public String getEnumTable(){
		return RestConsume.getRest(RestURIConstants.CATEGORY_REST_URL + "/all-tables");
	}
	
	@RequestMapping(method=RequestMethod.POST, value="/enum/update", consumes="application/json")
	@ResponseBody
	public TrustAmlResponse updateCategory(@RequestBody String jsonData) throws IOException{
		
		JSONObject json = new JSONObject(jsonData);
		System.out.println(json);
		User validatedUser = userDAO.getUserDetails(userDAO.getUsername());
        
        JSONObject userJson = new JSONObject();
        userJson.put("username", validatedUser.getUsername());
        userJson.put("sol_id", validatedUser.getSolId());
        
        json.put("user", userJson);
        System.out.println(json.toString());
        
        TrustAmlResponse response = null;
		
		
		try{
			response = RestConsume.putRest(RestURIConstants.CATEGORY_REST_URL, json.toString());
		}catch (Exception e) {
			e.printStackTrace();
		}

		return response;
	}
	
	@RequestMapping(method=RequestMethod.POST, value="/enum/bulk/update", consumes="application/json")
	@ResponseBody
	public TrustAmlResponse updateBulkCategory(@RequestBody String jsonData){
		JSONObject json = new JSONObject(jsonData);
		System.out.println(json);
		User validatedUser = userDAO.getUserDetails(userDAO.getUsername());
        
        JSONObject userJson = new JSONObject();
        userJson.put("username", validatedUser.getUsername());
        userJson.put("sol_id", validatedUser.getSolId());
        
        json.put("user", userJson);
        System.out.println(json.toString());
        
        TrustAmlResponse response = null;
		try{
			response = RestConsume.putRest(RestURIConstants.CATEGORY_REST_URL, json.toString());
		}catch (Exception e) {
			e.printStackTrace();
		}
		return response;
	}
	
	
	@RequestMapping(value="/enum/insert", method=RequestMethod.POST, consumes="application/json")
	@ResponseBody
	public TrustAmlResponse insertCategory(@RequestBody String jsonData){
       
		JSONObject json = new JSONObject(jsonData);
		System.out.println(json);
		User validatedUser = userDAO.getUserDetails(userDAO.getUsername());
        
        JSONObject userJson = new JSONObject();
        userJson.put("username", validatedUser.getUsername());
        userJson.put("sol_id", validatedUser.getSolId());
        
        json.put("user", userJson);
        System.out.println(json.toString());
        
        TrustAmlResponse response = null;
		try{
			response = RestConsume.postRest(RestURIConstants.CATEGORY_REST_URL, json.toString());
			
		}catch (Exception e) {
			e.printStackTrace();
		}
		return response;
	}
	*/
}

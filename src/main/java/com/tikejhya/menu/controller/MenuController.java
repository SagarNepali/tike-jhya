package com.tikejhya.menu.controller;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tikejhya.menu.dao.MenuDAO;
import com.tikejhya.menu.model.Menu;

@Controller
public class MenuController {

	@Autowired
	MenuDAO menuDAO;

	@RequestMapping(value = "/menu/list", method = RequestMethod.GET)
	public String menuListForm(Model model) {

		model.addAttribute("menus", menuDAO.getAllMenu());
		return "menu/menu-list";
	}

	@RequestMapping(value = "/menu/save", method = RequestMethod.POST, consumes="application/json")
	@ResponseBody
	public int saveMenuItem(@RequestBody String json) {
		String methodName = new Object() {
		}.getClass().getEnclosingMethod().getName();
		System.out.println(this.getClass().getSimpleName() + ":" + methodName + " method invoked.");
		
		
		System.out.println(json);
		
		ObjectMapper objectMapper = new ObjectMapper();
		int i = 0;
		try {
			Menu menu = objectMapper.readValue(json, Menu.class);
			if(menu.getId()!=0){
				i = menuDAO.update(menu);
			}else{
				i = menuDAO.insert(menu);
			}
		} catch (JsonParseException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return i;

	}
	
	@RequestMapping(value = "/menu/getById/{id}", method = RequestMethod.POST)
	public @ResponseBody Menu menuListForm(Model model,@PathVariable int id) {
		return menuDAO.getById(id);
	}

	@RequestMapping(value = "/menu/changeStatus/{id}/{status}", method = RequestMethod.POST)
	public @ResponseBody int changeStatus(Model model,@PathVariable int id,@PathVariable boolean status) {
		return menuDAO.changeStatus(id,status);
	}
}

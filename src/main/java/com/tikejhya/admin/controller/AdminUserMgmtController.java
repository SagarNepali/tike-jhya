package com.tikejhya.admin.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.tikejhya.user.dao.UserDAO;
import com.tikejhya.user.model.UserForm;
import com.tikejhya.user.util.FormDataJson;


@Controller
public class AdminUserMgmtController {
	
	@Autowired 
	UserDAO userDAO;
	
	
	
	@RequestMapping(value = "/admin/user/addForm", method = RequestMethod.GET)
	public ModelAndView adminUserAddForm(ModelAndView model) {
		model.addObject("formDataJson", new FormDataJson());
		model.setViewName("admin/admin-user-new");		
		return model;
	}	
	
	@RequestMapping(value = "/user/all/detail", method = RequestMethod.POST)
	@ResponseBody
	public List<UserForm> getListUserDetail(){
		return userDAO.getAllUserInfo();
	}
	
	@RequestMapping(method=RequestMethod.GET, value="/user/profile")
	public String userProfileChange(@RequestParam("username") String username){
		return "admin/profile";
	}
	
	@RequestMapping(method=RequestMethod.GET, value="/user/user-list")
	public String userListPage(Model model){
		model.addAttribute("userList", userDAO.getAllUserInfo());
		return "user/user-list";
	}
	

}

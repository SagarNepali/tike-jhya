package com.tikejhya.category.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tikejhya.category.dao.CategoryDAO;
import com.tikejhya.category.model.Category;

@Controller
public class CategoryController {

	@Autowired
	CategoryDAO categoryDAO;
	
	@RequestMapping(value="/category/list", method=RequestMethod.GET)
	public String categoryListForm(Model model){
		String methodName = new Object() {
		}.getClass().getEnclosingMethod().getName();
		System.out.println(this.getClass().getSimpleName() + ":" + methodName + " method invoked.");
		
		model.addAttribute("categories", categoryDAO.getAllCategories());
		return "category/category-list";
	}
	
	@RequestMapping(value="/te", method=RequestMethod.GET)
	@ResponseBody
	public List<Category> te(){
		return categoryDAO.getAllCategories();
	}
}

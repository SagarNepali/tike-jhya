package com.tikejhya.config;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.tikejhya.user.model.User;
import com.tikejhya.user.dao.UserDAO;

@Controller
public class ControllerTaml {

	@Autowired
	private UserDAO userDAO;
	
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String homePage(RedirectAttributes redirectAttributes,Model uiModel) {	
		String username = userDAO.getUsername();
		
		if(!username.equals("anonymousUser")){
			User validatedUser = userDAO.getUserDetails(userDAO.getUsername());		
			Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

		        boolean hasRoleEmployee = authentication.getAuthorities().stream()
		                  .anyMatch(r -> r.getAuthority().equals("ROLE_EMPLOYEE"));

		        boolean hasRoleUser = authentication.getAuthorities().stream()
		                  .anyMatch(r -> r.getAuthority().equals("ROLE_USER"));
		        

		        boolean hasRoleAdmin = authentication.getAuthorities().stream()
		                  .anyMatch(r -> r.getAuthority().equals("ROLE_ADMIN"));
			if(validatedUser != null && hasRoleEmployee){
				redirectAttributes.asMap().clear();
	        	redirectAttributes.addFlashAttribute("user", validatedUser);
	        	 return "redirect:/employeeDashboardForm";
			} else if(validatedUser != null && hasRoleUser){
				redirectAttributes.asMap().clear();
	        	redirectAttributes.addFlashAttribute("user", validatedUser);
	        	 return "redirect:/userDashboardForm";
			} else if(validatedUser != null && hasRoleAdmin){
				redirectAttributes.asMap().clear();
	        	redirectAttributes.addFlashAttribute("user", validatedUser);
	        	 return "redirect:/adminDashboardForm";
			}
		}	
		
//		uiModel.addAttribute("bfiName", RestConsume.getRestData(RestURIConstants.ZEUS_GET_BFI_NAME));
		return "login";
	}

	@RequestMapping(value = "/accessDenied", method = RequestMethod.GET)
	public ModelAndView accessDeniedPage(ModelAndView model) {
		User validatedUser = userDAO.getUserDetails(userDAO.getUsername());		
		if(validatedUser != null){
			model.addObject("user", validatedUser);
		}		
		model.setViewName("access-denied");		
		return model;		
	}
	
	@RequestMapping(value = "/login", method = RequestMethod.GET)
	public String loginPage(RedirectAttributes redirectAttributes,Model uiModel) {
		String username = userDAO.getUsername();
		
		if(!username.equals("anonymousUser")){
			User validatedUser = userDAO.getUserDetails(userDAO.getUsername());		
			Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

		        boolean hasRoleEmployee = authentication.getAuthorities().stream()
		                  .anyMatch(r -> r.getAuthority().equals("ROLE_EMPLOYEE"));

		        boolean hasRoleUser= authentication.getAuthorities().stream()
		                  .anyMatch(r -> r.getAuthority().equals("ROLE_USER"));
		        

		        boolean hasRoleAdmin = authentication.getAuthorities().stream()
		                  .anyMatch(r -> r.getAuthority().equals("ROLE_ADMIN"));
			if(validatedUser != null && hasRoleEmployee){
				redirectAttributes.asMap().clear();
	        	redirectAttributes.addFlashAttribute("user", validatedUser);
	        	 return "redirect:/employeeDashboardForm";
			} else if(validatedUser != null && hasRoleUser){
				redirectAttributes.asMap().clear();
	        	redirectAttributes.addFlashAttribute("user", validatedUser);
	        	 return "redirect:/userDashboardForm";
			} else if(validatedUser != null && hasRoleAdmin){
				redirectAttributes.asMap().clear();
	        	redirectAttributes.addFlashAttribute("user", validatedUser);
	        	 return "redirect:/employeeDashboardForm";
			}
		}	
		
//		uiModel.addAttribute("bfiName", RestConsume.getRestData(RestURIConstants.ZEUS_GET_BFI_NAME));
		return "login";
	}
	
	@PreAuthorize("hasRole('ROLE_EMPLOYEE')")
	@RequestMapping(value = "/employeeDashboardForm", method = RequestMethod.GET)
	public String employeeDashboardForm(Model uiModel, RedirectAttributes redirectAttributes) {
		User validatedUser = userDAO.getUserDetails(userDAO.getUsername());		
		if(validatedUser != null){
			uiModel.addAttribute("user", validatedUser);
//	        uiModel.addAttribute("bfiName", RestConsume.getRestData(RestURIConstants.ZEUS_GET_BFI_NAME));
		}
		return "employee-dashboard";
	}	
	
	@PreAuthorize("hasRole('ROLE_USER')")
	@RequestMapping(value = "/userDashboardForm", method = RequestMethod.GET)
	public String userDashboardForm(Model uiModel) {
		User validatedUser = userDAO.getUserDetails(userDAO.getUsername());		
		if(validatedUser != null){
			uiModel.addAttribute("user", validatedUser);
//			uiModel.addAttribute("bfiName", RestConsume.getRestData(RestURIConstants.ZEUS_GET_BFI_NAME));
		}
		return "user-dashboard";
		
	}	
	
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@RequestMapping(value = "/adminDashboardForm", method = RequestMethod.GET)
	public String adminDashboardForm(Model uiModel) {		
		User validatedUser = userDAO.getUserDetails(userDAO.getUsername());		
		if(validatedUser != null){
			uiModel.addAttribute("user", validatedUser);
//			uiModel.addAttribute("bfiName", RestConsume.getRestData(RestURIConstants.ZEUS_GET_BFI_NAME));
		}
		return "admin-dashboard";
	}
	
	@RequestMapping(value = "/logout", method = RequestMethod.GET)
	public String logoutPage(HttpServletRequest request, HttpServletResponse response){
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		if(auth != null){
			new SecurityContextLogoutHandler().logout(request, response, auth);
		}
		return "redirect:/login?logout";
	}
}
package com.tikejhya.config;

import javax.sql.DataSource;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.view.InternalResourceViewResolver;
import org.springframework.web.servlet.view.JstlView;

import com.tikejhya.category.dao.CategoryDAO;
import com.tikejhya.category.dao.CategoryDAOImpl;
import com.tikejhya.menu.dao.MenuDAO;
import com.tikejhya.menu.dao.MenuDAOImpl;
import com.tikejhya.user.dao.UserDAO;
import com.tikejhya.user.dao.UserDAOImplementation;

@EnableWebMvc
@ComponentScan(basePackages = "com.tikejhya")
@Configuration
public class WebMvcConfig extends WebMvcConfigurerAdapter {


	@Bean
	public ViewResolver viewResolver() {
		InternalResourceViewResolver viewResolver = new InternalResourceViewResolver();
		viewResolver.setViewClass(JstlView.class);
		viewResolver.setPrefix("/WEB-INF/views/");
		viewResolver.setSuffix(".jsp");
		return viewResolver;
	}

	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		registry.addResourceHandler("/static/**").addResourceLocations("/static/");
	}
	
//	@Bean(name = "dataSource")
//	public DataSource getDataSource(){
//		DriverManagerDataSource dataSource = new DriverManagerDataSource();
//		dataSource.setDriverClassName("org.postgresql.Driver");
//		dataSource.setUrl("jdbc:postgresql://localhost:5432/research_test");
//		dataSource.setUsername("postgres");
//		dataSource.setPassword("Tru$T@ml!@34");	
//		
//		return dataSource;		
//	}
	@Bean(name = "dataSource")
	public DataSource getDataSource(){
		DriverManagerDataSource dataSource = new DriverManagerDataSource();
		dataSource.setDriverClassName("com.mysql.cj.jdbc.Driver");
		dataSource.setUrl("jdbc:mysql://localhost:3306/tike_jhya");
		dataSource.setUsername("root");
		dataSource.setPassword("");	
		
		return dataSource;		
	}

	@Bean
	public UserDAO getUserDAO(){
		return new UserDAOImplementation(getDataSource());
	}
	
	
	@Bean
	public CategoryDAO getCategoryDAO(){
		return new CategoryDAOImpl(getDataSource());
	}
	
	@Bean
	public MenuDAO getMenuDAO(){
		return new MenuDAOImpl(getDataSource());
	}
	
}

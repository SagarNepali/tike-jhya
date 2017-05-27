package com.tikejhya.config;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;


@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter{
	
	@Autowired
	DataSource dataSource;
	
	@Autowired
	SecuritySuccessHandler securitySuccessHandler;
	
	@Autowired	
	public void cofigureGlobalSecurity(AuthenticationManagerBuilder auth) throws Exception{
		
		auth.jdbcAuthentication().dataSource(dataSource)
			.passwordEncoder(passwordEncoder())
			.usersByUsernameQuery("select username, password, status from users where username=?")
			.authoritiesByUsernameQuery("select username, role from user_roles where username=?");	
		
	}
	
	
	protected void configure(HttpSecurity http) throws Exception {
		http.authorizeRequests()
  		.antMatchers("/").permitAll()	  		
  		.antMatchers("/userDashboardForm/**").access("hasRole('USER')")
  		.antMatchers("/adminDashboardForm/**").access("hasRole('ADMIN')")	  		
  		.antMatchers("/employeeDashboardForm/**").access("hasRole('EMPLOYEE')")	  		
  		.antMatchers(HttpMethod.POST, "/**").authenticated()
  	.and()
  		.headers().frameOptions().disable()
	.and()
		.formLogin()
		.loginPage("/login").successHandler(securitySuccessHandler)
		.usernameParameter("ssoId")
		.passwordParameter("password")	
	.and()
		.exceptionHandling()
		.accessDeniedPage("/accessDenied")			
	.and()
		.csrf().disable();
	}
	
	@Bean
	public PasswordEncoder passwordEncoder(){
		PasswordEncoder encoder = new BCryptPasswordEncoder();
		return encoder;
	}

}

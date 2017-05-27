<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<head>
<spring:url value="/static/js/admin/profile.js" var="userJS" />

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
</head>


<div class="row">
 
	<div class="col-md-12 col-sm-12 col-xs-12">
		<div class="x_panel">
			<div class="x_title">
				<h2>
					<i class="fa fa-user" aria-hidden="true"></i> User Profile &amp; Update
				</h2>
				<a href="./user/user-list" id="users-back" class="btn btn-primary content-links" style="float: right;">
 <span class="glyphicon glyphicon-chevron-left"></span> Back </a>
				<div class="clearfix"></div>
			</div>
			<div class="x_content">
				<!-- user Search form content -->
				<div class="x_panel">
					<div class="x_title">
						<h2>
							<small>To update user information, please search using keyword the click Update.</small>
						</h2>
						<div class="clearfix"></div>
					</div>
					<input id="fetch-detail" type="button" style="display: none;"></input>
					
					<div class="clearfix"></div>
					<hr>
					<div class="x_content">
						<form method="post" id="update-profile-form">
						
							
							<div class="clearfix"></div>
							<div class="col-md-4 col-sm-12 col-xs-12 item form-group">
								<label class="control-label col-md-4 col-sm-4 col-xs-12"
									for="first-name">First name <span
									style="color: #FF0000;">*</span></label>
								<div class="col-md-8 col-sm-8 col-xs-12">
									<input class="form-control col-sm-8 col-md-7 col-xs-12"
										id="first-name" name="first-name" placeholder="First name"
										required="required" type="text"  disabled="disabled"/>
								</div>
							</div>
							<div class="col-md-4 col-sm-12 col-xs-12 item form-group">
								<label class="control-label col-md-4 col-sm-4 col-xs-12"
									for="middle-name">Middle name</label>
								<div class="col-md-8 col-sm-8 col-xs-12">
									<input class="form-control col-sm-8 col-md-7 col-xs-12"
										id="middle-name" name="middle-name" placeholder="Middle name:"
										type="text" disabled="disabled"/>
								</div>
							</div>
							<div class="col-md-4 col-sm-12 col-xs-12 item form-group">
								<label class="control-label col-md-4 col-sm-4 col-xs-12"
									for="last-name">Last name</label>
								<div class="col-md-8 col-sm-8 col-xs-12">
									<input class="form-control col-sm-8 col-md-7 col-xs-12"
										id="last-name" name="last-name" placeholder="Last name"
										type="text"  disabled="disabled"/>
								</div>
							</div>


							<div class="clearfix"></div>
							<div class="col-md-4 col-sm-12 col-xs-12 item form-group">
								<label class="control-label col-md-4 col-sm-4 col-xs-12"
									for="user-role">User role <span style="color: #FF0000;">*</span></label>
								<div class="col-md-8 col-sm-8 col-xs-12">
									<select
										class="form-control col-sm-8 col-md-7 col-xs-12 user-role"
										id="user-role" name="user-role" required="required" disabled="disabled">
										<option value="">Select user role</option>
										<option disabled style="background-color: #aaa;"></option>
									</select>
								</div>
							</div>

							<div class="col-md-4 col-sm-12 col-xs-12 item form-group">
								<label class="control-label col-md-4 col-sm-4 col-xs-12"
									for="sol-id">Sol ID <span style="color: #FF0000;">*</span></label>
								<div class="col-md-8 col-sm-8 col-xs-12">
									<select class="form-control col-sm-8 col-md-7 col-xs-12 sol-id"
										id="sol-id" name="sol-id" required="required" disabled="disabled">
										<option value="">Select SOL Id</option>
										<option disabled style="background-color: #aaa;"></option>
									</select>
								</div>
							</div>
							<div class="col-md-4 col-sm-12 col-xs-12 item form-group">
									<label class="control-label col-md-4 col-sm-4 col-xs-12"
										for="username">Username <span style="color: #FF0000;">*</span></label>
									<div class="col-md-8 col-sm-8 col-xs-12">
										<input class="form-control col-sm-8 col-md-7 col-xs-12"
											id="username" required="required" name="username"
											placeholder="Username" type="text" disabled="disabled" />
									</div>
								</div>
									<div class="clearfix"></div>
							<div class="col-md-4 col-sm-12 col-xs-12 item form-group">
								<label class="control-label col-md-4 col-sm-4 col-xs-12"
									for="employee-id">Employee ID <span
									style="color: #FF0000;">*</span></label>
								<div class="col-md-8 col-sm-8 col-xs-12">
									<input class="form-control col-sm-8 col-md-7 col-xs-12"
										id="employee-id" name="employee-id" placeholder="Employee ID"
										type="text"  required="required" disabled="disabled"/>
								</div>
							</div>
							<div class="col-md-4 col-sm-12 col-xs-12 item form-group">
								<label class="control-label col-md-4 col-sm-4 col-xs-12"
									for="designation">Designation <span
									style="color: #FF0000;">*</span></label>
								<div class="col-md-8 col-sm-8 col-xs-12">
									<input class="form-control col-sm-8 col-md-7 col-xs-12"
										id="designation" name="designation" placeholder="Designation"
										type="text" required="required" />
								</div>
							</div>
							<div class="col-md-4 col-sm-12 col-xs-12 item form-group">
                                <label class="control-label col-md-4 col-sm-4 col-xs-12"
                                    for="user-status">User status <span style="color: #FF0000;">*</span></label>
                                <div class="col-md-8 col-sm-8 col-xs-12">
                                    <select class="form-control col-sm-8 col-md-7 col-xs-12 user-status"
                                        id="user-status" name="user-status" required="required">
                                        <option value="Disabled" label="" >Disabled</option>                                        
                                        <option disabled style="background-color: #aaa;"></option>
                                        
                                    </select>
                                </div>
                            </div>

							<div class="clearfix"></div>
							

							<div class="clearfix"></div>

							<div class="col-md-4 col-sm-12 col-xs-12 item form-group">
								<label class="control-label col-md-4 col-sm-4 col-xs-12"
									for="office-contact-no">Office contact no. <span
									style="color: #FF0000;">*</span></label>
								<div class="col-md-8 col-sm-8 col-xs-12">
									<input class="form-control col-sm-8 col-md-7 col-xs-12"
										id="office-contact-no" name="office-contact-no"
										placeholder="Office contact no" type="text"
										 required="required" />
								</div>
							</div>

							<div class="col-md-4 col-sm-12 col-xs-12 item form-group">
								<label class="control-label col-md-4 col-sm-4 col-xs-12"
									for="mobile-contact-no">Mobile contact no. <span
									style="color: #FF0000;">*</span></label>
								<div class="col-md-8 col-sm-8 col-xs-12">
									<input class="form-control col-sm-8 col-md-7 col-xs-12"
										id="mobile-contact-no" name="mobile-contact-no"
										placeholder="Mobile contact no" type="text"
										 required="required" />
								</div>
							</div>

							<div class="col-md-4 col-sm-12 col-xs-12 item form-group">
								<label class="control-label col-md-4 col-sm-4 col-xs-12"
									for="email">Email <span style="color: #FF0000;">*</span></label>
								<div class="col-md-8 col-sm-8 col-xs-12">
									<input class="form-control col-sm-8 col-md-7 col-xs-12"
										id="email" name="email" placeholder="Email" type="text"
										 required="required" disabled="disabled"/>
								</div>
							</div>
							

							<hr />
							<input type="button" id="update-profile-submit-btn" value="Update"
								class="btn btn-primary" />
						</form>
						<form id="update-user-form-array" action="./userUpdateSubmit"
							method="POST" target="submitFrame" modelAttribute="formDataJson">
							<input type="hidden" name="jsonString" value="" id="json-data"
								path="jsonString" />
							<div class="clearfix"></div>
							<hr>
							<input type="submit" id="update-user-submit-btn"
								style="display: none">
						</form>

						<script>
							$(".message-body")
									.html(
											"<iframe name='submitFrame' id='submitFrame' class='flatFrame' />");
							getOptionValue([ "user-role", "sol-id", "user-status" ]);
						</script>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<script src="${userJS}"></script>
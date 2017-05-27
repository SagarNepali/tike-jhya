<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
</head>
<!-- /.modal -->
<div class="row">
	<div class="col-md-12 col-sm-12 col-xs-12">
		<div class="x_panel">
			<div class="x_title">
				<h2>
					<i class="fa fa-user" aria-hidden="true"></i> User Search &amp; Update
				</h2>
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
					
					<div class="clearfix"></div>
					<hr>
					<div class="x_content">
						<form method="post" id="update-user-form">
							<div class="col-md-4 col-sm-12 col-xs-12 item form-group">
								<label class="control-label col-md-4 col-sm-4 col-xs-12"
									for="user-role">User role <span style="color: #FF0000;">*</span></label>
								<div class="col-md-8 col-sm-8 col-xs-12">
									<select
										class="form-control col-sm-8 col-md-7 col-xs-12 user-role"
										id="user-role" name="user-role" required="required"
										path="userRole">
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
										id="sol-id" name="sol-id" required="required" path="solId">
										<option value="">Select SOL Id</option>
										<option disabled style="background-color: #aaa;"></option>
									</select>
								</div>
							</div>

							<div class="col-md-4 col-sm-12 col-xs-12 item form-group">
								<div class="col-md-1 col-sm-1 col-xs-1">
									<input class="form-control" id="is-kyc-available"
										name="is-kyc-available" path="isKycAvailable" value="true" type="checkbox">
								</div>
								<label class="control-label col-md-3" for="kyc-id"
									style="margin-top: 10px;"> KYC ID</label>
								<div class="col-md-8 col-sm-8 col-xs-12">
									<input class="form-control col-sm-8 col-md-7 col-xs-12"
										id="kyc-id" name="kyc-id" placeholder="KYC ID" type="text"
										disabled="disabled" path="kycID" />
								</div>
							</div>
							<script>
							  
							
								$("#is-kyc-available").click(
										function(event) {
											if (this.checked) {
												$("#kyc-id").removeAttr(
														'disabled');
											} else {
												$("#kyc-id").attr('disabled',
														'disabled');
											}
										});
							</script>

							<div class="clearfix"></div>
							<hr>

							<div class="clearfix"></div>
							<div class="col-md-4 col-sm-12 col-xs-12 item form-group">
								<label class="control-label col-md-4 col-sm-4 col-xs-12"
									for="first-name">First name <span
									style="color: #FF0000;">*</span></label>
								<div class="col-md-8 col-sm-8 col-xs-12">
									<input class="form-control col-sm-8 col-md-7 col-xs-12"
										id="first-name" name="first-name" placeholder="First name"
										required="required" type="text" path="firstName" disabled/>
								</div>
							</div>
							<div class="col-md-4 col-sm-12 col-xs-12 item form-group">
								<label class="control-label col-md-4 col-sm-4 col-xs-12"
									for="middle-name">Middle name</label>
								<div class="col-md-8 col-sm-8 col-xs-12">
									<input class="form-control col-sm-8 col-md-7 col-xs-12"
										id="middle-name" name="middle-name" placeholder="Middle name:"
										type="text" path="middleName" disabled/>
								</div>
							</div>
							<div class="col-md-4 col-sm-12 col-xs-12 item form-group">
								<label class="control-label col-md-4 col-sm-4 col-xs-12"
									for="last-name">Last name</label>
								<div class="col-md-8 col-sm-8 col-xs-12">
									<input class="form-control col-sm-8 col-md-7 col-xs-12"
										id="last-name" name="last-name" placeholder="Last name"
										type="text" path="lastName" disabled/>
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
										type="text" path="Employee ID" required="required" disabled/>
								</div>
							</div>
							<div class="col-md-4 col-sm-12 col-xs-12 item form-group">
								<label class="control-label col-md-4 col-sm-4 col-xs-12"
									for="designation">Designation <span
									style="color: #FF0000;">*</span></label>
								<div class="col-md-8 col-sm-8 col-xs-12">
									<input class="form-control col-sm-8 col-md-7 col-xs-12"
										id="designation" name="designation" placeholder="Designation"
										type="text" path="Designation" required="required" />
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
										path="officeContactNo" required="required" />
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
										path="mobileContactNo" required="required" />
								</div>
							</div>

							<div class="col-md-4 col-sm-12 col-xs-12 item form-group">
								<label class="control-label col-md-4 col-sm-4 col-xs-12"
									for="email">Email <span style="color: #FF0000;">*</span></label>
								<div class="col-md-8 col-sm-8 col-xs-12">
									<input class="form-control col-sm-8 col-md-7 col-xs-12"
										id="email" name="email" placeholder="Email" type="text"
										path="Email" required="required" disabled/>
								</div>
							</div>


                            <div id="username-message" style="float: left;color:red;">${userExists}</div>
							<div id="password-message" style="float: right;color:red;">No password provided.</div>
							<div class="clearfix"></div>
							<div id="screening-request-wrap">
								<div class="col-md-4 col-sm-12 col-xs-12 item form-group">
									<label class="control-label col-md-4 col-sm-4 col-xs-12"
										for="username">Username <span style="color: #FF0000;">*</span></label>
									<div class="col-md-8 col-sm-8 col-xs-12">
										<input class="form-control col-sm-8 col-md-7 col-xs-12"
											id="username" required="required" name="username"
											placeholder="Username" type="text" path="username" disabled/>
									</div>
								</div>
								<div class="col-md-4 col-sm-12 col-xs-12 item form-group">
									<label class="control-label col-md-4 col-sm-4 col-xs-12"
										for="password">Password <span style="color: #FF0000;">*</span></label>
									<div class="col-md-8 col-sm-8 col-xs-12">
										<input class="form-control col-sm-8 col-md-7 col-xs-12"
											id="password" name="password" placeholder="Password"
											required="required" type="password" path="password" disabled/>
									</div>
								</div>
							</div>
							<div class="clearfix"></div>
							
							<div class="col-md-4 col-sm-12 col-xs-12 item form-group">
                                <label class="control-label col-md-4 col-sm-4 col-xs-12"
                                    for="user-status">User status <span style="color: #FF0000;">*</span></label>
                                <div class="col-md-8 col-sm-8 col-xs-12">
                                    <select class="form-control col-sm-8 col-md-7 col-xs-12 user-status"
                                        id="user-status" name="user-status" required="required" path="userStatus">
                                        <option value="Disabled" label="" >Disabled</option>                                        
                                        <option disabled style="background-color: #aaa;"></option>
                                        
                                    </select>
                                </div>
                            </div>
							
							<div class="col-md-4 col-sm-12 col-xs-12 item form-group">
							     <div class="col-md-1 col-sm-1 col-xs-1">
                                    <input class="form-control" id="account-expiry"
                                        name="account-expiry" value="true" path="accountExpiry" type="checkbox">
                                </div>
							
                                <label class="control-label col-md-3"
                                    for="date-of-account-expiry">Account expiry</label>
                                <div class="col-md-8 col-sm-8 col-xs-12">
                                    <input class="form-control col-sm-8 col-md-7 col-xs-12"
                                        id="date-of-account-expiry" name="date-of-account-expiry"
                                        placeholder="Select date of account expiry" type="text"
                                        path="dateOfAccountExpiry" disabled/>
                                </div>
                                <script>
                                $("#account-expiry").click(
                                        function(event) {
                                            if (this.checked) {
                                                $("#date-of-account-expiry").removeAttr(
                                                        'disabled');
                                            } else {
                                                $("#date-of-account-expiry").attr('disabled',
                                                        'disabled');
                                            }
                                        });
                                
                                
                                    $('#date-of-account-expiry')
                                            .daterangepicker(
                                                    {
                                                        singleDatePicker : true,                                                        
                                                        showDropdowns : true,
                                                        minDate : new Date(),
                                                        maxDate : moment().add(10, 'years')
                                                    },
                                                    function(start, end, label) {
                                                        $('#date-of-account-expiry')
                                                                .val( start.format("YYYY-MM-DD"));
                                                    });
                                </script>
                            </div>
							<div class="clearfix"></div>
							<hr />
							<input type="button" id="update-user-form-submit-btn" value="Submit"
								class="btn btn-primary" disabled />
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
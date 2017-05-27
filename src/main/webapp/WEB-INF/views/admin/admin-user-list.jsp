
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<spring:url value="/static/js/admin/profile.js" var="profileJS" />
<script src="${profileJS}"></script>

<!-- Password Update Information  -->
<div class="modal fade" id="passwordModal" tabindex="-1" role="dialog"
	data-backdrop="false" aria-labelledby="exampleModalLabel">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<form id="password-change-form" autocomplete="off">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title">Update Password</h4>
				</div>
				<div class="modal-body">
					<div id="password-message" style="float: right; color: red;">Password
						empty!</div>
					<div class="form-group">
						<label for="password" class="control-label">Password:</label> <input
							id="password" type="password" placeholder="Provide New Password"
							class="form-control" required></input>
					</div>
					<br />
					<div class="form-group">
						<label for="confirm-password" class="control-label">Verify
							Password:</label> <input id="confirm-password" type="password"
							placeholder="Verify Password" class="form-control" required></input>
					</div>
					<br />
					<div class="form-group">
						<div class="checkbox">
							<label class="control-label"> <input id="confirm"
								type="checkbox" required="required"> Confirm new
								password is approved
							</label>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button id="btn-password-update" type="submit"
						class="btn btn-primary" disabled="disabled">Update</button>
					<span><button type="button" class="btn btn-default"
							data-dismiss="modal">Cancel</button></span>
				</div>
			</form>
		</div>
	</div>
</div>

<!-- Role Update Information  -->
<div class="modal fade" id="roleModal" tabindex="-1" role="dialog"
	data-backdrop="false" aria-labelledby="exampleModalLabel">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<form id="role-change-form" autocomplete="off">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title">Update Role</h4>
				</div>
				<div class="modal-body">
					<div class="form-group">
						<label for="user_role" class="control-label"> User Role
							Value:</label> <select id="user_role" class="form-control user-role">
							<option value="">Select User Role</option>
							<option disabled style="background-color: #aaa;"></option>
						</select>
					</div>
					<div class="form-group">
						<label for="role_reason" class="control-label">Reason:</label>
						<textarea id="role_reason"
							placeholder="Provide Possible Reasons..." class="form-control"
							rows="3" required></textarea>
					</div>

					<div class="form-group">

						<div class="checkbox">
							<label class="control-label"> <input id="role_confirm"
								type="checkbox"> Confirm new role for user is approved
							</label>
						</div>

					</div>
				</div>
				<div class="modal-footer">
					<button id="btn-role-update" type="submit" class="btn btn-primary"
						disabled="disabled">Update</button>
					<span><button type="button" class="btn btn-default"
							data-dismiss="modal">Cancel</button></span>
				</div>
			</form>
		</div>
	</div>
</div>

<div class="row">
	<div class="col-md-12 col-sm-12 col-xs-12">
		<div class="x_panel">
			<div class="x_title">
				<h2>
					<i class="fa fa-user" aria-hidden="true"></i> Users List
				</h2>
				<div class="clearfix"></div>
			</div>
			<div class="x_content">
				<!-- user Search form content -->
				<div class="x_panel">
					<div class="x_title">
						<h2>
							<small>To update password or profile of a user, please
								select update password or update profile button of respective
								user.</small>
						</h2>
						<div class="clearfix"></div>
					</div>
					<div class="x_content">
						<button id="user-list" style="display: none"></button>
						<div class="container-fluid">
							<table id="userListTable"
								class="table table-bordered table-striped datatable-class">
								<thead>
									<tr>
										<th>User Name</th>
										<th>First Name</th>
										<th>Middle Name</th>
										<th>Last Name</th>
										<th>Address</th>
										<th>Designation</th>
										<th>Contact No</th>
										<th>Emergency Contact No</th>
										<th>Email</th>
										<th>Status</th>
										<th>Update Password</th>
										<th>Update Profile</th>
									</tr>
								</thead>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<script>
	getOptionValue([ "user-role" ]);
</script>

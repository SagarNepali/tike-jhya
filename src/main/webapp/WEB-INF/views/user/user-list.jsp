
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>

<div id="content">

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
						<button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
						<span><button id="btn-password-update" type="submit"
								class="btn btn-info" disabled="disabled">Update</button></span>
					</div>
				</form>
			</div>
		</div>
	</div>

	<div class="row">
		<div class="col-md-1"></div>
		<div class="col-md-10">
			<div id="branch-list">

				<button id="user-list" style="display: none"></button>
				<table id="userListTable" class="table table-bordered table-striped">
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
					<c:forEach items="${userList }" var="user">
						<tr>
							<td>${user.username }</td>
							<td>${user.firstName }</td>
							<td>${user.middleName }</td>
							<td>${user.lastName }</td>
							<td>${user.address}</td>
							<td>${user.designation}</td>
							<td>${user.contactNo }</td>
							<td>${user.emergencyContactNo }</td>
							<td>${user.emailId }</td>

							<c:choose>
								<c:when test="${user.status }">
									<td><span class='label label-success'>Activated</span></td>
								</c:when>

								<c:otherwise>
									<td><span class='label label-danger'>Deactivated</span></td>
								</c:otherwise>
							</c:choose>
							<td><a class="change-password center btn btn-default" href="./user/password?username=' + data["username"] + '"><i class="fa fa-key fa-fw"></i></a></td>
							<td><a class="update-profile center btn btn-default" href="./user/profile?username=' + data["username"] + '"><i class="fa fa-user fa-fw"></i></a></td>

						</tr>
					</c:forEach>

				</table>

			</div>

		</div>
		<div class="col-md-1"></div>
	</div>
</div>

<script>
	$("#userListTable").dataTable();
</script>
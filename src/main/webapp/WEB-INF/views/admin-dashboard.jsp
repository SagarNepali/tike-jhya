<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
   "http://www.w3.org/TR/html4/loose.dtd">
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<html lang="en">
<head>
<style>
.input-sm {
	float: none;
}

.table td .center {
	margin-left: 35px;
}

.table th {
	text-align: center;
}
</style>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">

<spring:url value="/static/css/bootstrap.min.css" var="bootstrapCss" />
<spring:url value="/static/css/custom.css" var="customCss" />
<spring:url value="/static/css/font-awesome.min.css"
	var="fontawesomeCss" />
<spring:url value="/static/css/select2.min.css" var="selectCss" />
<spring:url value="/static/css/dropzone.min.css" var="dropzoneCss" />


<spring:url value="/static/js/jquery/jquery.min.js" var="jqueryJs" />
<spring:url value="/static/js/bootstrap/bootstrap.min.js"
	var="bootstrapJs" />

<spring:url value="/static/js/bootbox/bootbox.min.js" var="bootboxJs" />
<spring:url value="/static/js/chart/chart.min.js" var="chartJs" />
<spring:url value="/static/js/moment/moment.min.js" var="momentJs" />
<spring:url value="/static/js/datepicker/daterangepicker.js"
	var="datepickerJs" />
<spring:url value="/static/js/table2excel/jquery.table2excel.min.js"
	var="tableToExcelJs" />

<spring:url value="/static/js/lists/countries.js" var="countriesJs" />
<spring:url value="/static/js/lists/districts.js" var="districtsJs" />

<spring:url value="/static/js/select2.min.js" var="selectJs" />
<spring:url value="/static/js/validator.min.js" var="validatorJs" />
<spring:url value="/static/js/jquery.validate.min.js" var="validateJs" />
<spring:url value="/static/js/json-object-manipulator.js"
	var="jsonObjectManipulatorJs" />
<spring:url value="/static/js/dropzone/dropzone.min.js" var="dropzoneJs" />
<spring:url value="/static/js/cytoscape/cytoscape.min.js"
	var="cytoscapeJs" />

<spring:url value="/static/js/custom.js" var="customJs" />
<spring:url value="/static/js/custom-ui.js" var="customUiJs" />
<spring:url value="/static/js/admin/user.js" var="userJs" />
<spring:url value="/static/js/admin/dashboard.js" var="dashboardJS" />


<spring:url
	value="/static/datatables-1.10.10/media/css/dataTables.bootstrap.css"
	var="datatableBootstrap" />
<spring:url
	value="/static/datatables-1.10.10/extensions/Responsive/css/responsive.bootstrap.css"
	var="datatableResponsive" />
<spring:url
	value="/static/datatables-1.10.10/extensions/Buttons/css/buttons.bootstrap.css"
	var="datatableButton" />
<spring:url
	value="/static/datatables-1.10.10/media/js/jquery.dataTables.min.js"
	var="datatableJquery" />
<spring:url
	value="/static/datatables-1.10.10/media/js/dataTables.bootstrap.min.js"
	var="datatableBootstrapJs" />
<spring:url
	value="/static/datatables-1.10.10/extensions/Buttons/js/dataTables.buttons.min.js"
	var="datatableButtonJs" />
<spring:url
	value="/static/datatables-1.10.10/extensions/Buttons/js/buttons.bootstrap.js"
	var="datatableButtonBootstrapJs" />

<spring:url value="/static/images" var="images" />

<link href="${bootstrapCss}" rel="stylesheet" />
<link href="${customCss}" rel="stylesheet" />
<link href="${fontawesomeCss}" rel="stylesheet" />
<link href="${selectCss}" rel="stylesheet" />
<link href="${dropzoneCss}" rel="stylesheet" />


<script src="${jqueryJs}"></script>
<script src="${bootstrapJs}"></script>
<script src="${bootboxJs}"></script>
<script src="${momentJs}"></script>
<script src="${chartJs}"></script>
<script src="${datepickerJs}"></script>
<script src="${tableToExcelJs}"></script>

<script src="${countriesJs}"></script>
<script src="${districtsJs}"></script>

<script src="${selectJs}"></script>
<script src="${customJs}"></script>
<script src="${customUiJs}"></script>
<script src="${validatorJs}"></script>
<script src="${validateJs}"></script>
<script src="${jsonObjectManipulatorJs}"></script>
<script src="${dropzoneJs}"></script>

<link href="${datatableButton}" rel="stylesheet" />
<link href="${datatableBootstrap}" rel="stylesheet" />

<link href="${datatableResponsive}" rel="stylesheet" />



<script src="${datatableJquery}"></script>

<script src="${datatableBootstrapJs}"></script>
<script src="${datatableButtonJs}"></script>
<script src="${datatableButtonBootstrapJs}"></script>

<script src="${userJs}"></script>
<script src="${bfiJs}"></script>
<script src="${branchJs}"></script>
<script src="${dashboardJS}"></script>


<title>Tike Jhya</title>
</head>


<body class="nav-md">
	<!-- Loading gif image -->
	<div class="pre-loader" style="display: none;"></div>

	<div class="container body">
		<img src="${images}/tike-logo.png"
			style="height: 250px; width: 50%; margin-left: 25%;" />
		<div class="main_container" id="main_container">
			<nav class="navbar navbar-default">
			<div class="container-fluid">
				<ul class="nav navbar-nav">

					<li><a class="dropdown-toggle " data-toggle="dropdown"
						href="#"><b>Users</b> <span class="caret"></span></a>
						<ul class="dropdown-menu">
							<li><a class="content-links"
								href="${pageContext.request.contextPath}/admin/user/addForm"><b>Add
										New User</b></a></li>
							<li><a class="content-links"
								href="${pageContext.request.contextPath}/user/user-list"><b>All
										User</b></a></li>
						</ul></li>
					<li><a class="dropdown-toggle " data-toggle="dropdown"
						href="#"><b>Category</b> <span class="caret"></span></a>
						<ul class="dropdown-menu">
							<li><a class="content-links"
								href="${pageContext.request.contextPath}/category/list"><b>Manage
										Category</b></a></li>
						</ul></li>
						
						<li><a class="dropdown-toggle " data-toggle="dropdown"
						href="#"><b>Menu</b> <span class="caret"></span></a>
						<ul class="dropdown-menu">
							<li><a class="content-links"
								href="${pageContext.request.contextPath}/menu/list"><b>Manage
										Menu</b></a></li>
						</ul></li>
				</ul>
				<div style="float: right; padding: 0px 10px; display: table-cell;">
					<h4>
						<span class="label"> <a
							class='btn btn-danger pull-right clear-active'
							href="<c:url value="/logout" />"><i class="fa fa-sing-out"
								aria-hidden="true"></i>Logout</a>
						</span> <span> <a class='btn btn-primary pull-right' href="#"
							disabled>Admin logged in:
								${pageContext.request.userPrincipal.name}</a>
						</span>
					</h4>
				</div>
			</div>
			</nav>
			<!-- page content -->
			<div class="right_col" id="right-col" role="main">
				<div class="">
					<div class="row" id="page-content">
						<div class="col-md-12 col-sm-12 col-xs-12"
							id="user-activity-base-div">
							<div class="x_panel">
								<div class="x_title">
									<h2>Greetings, ${user.username}!</h2>
									<div class="clearfix"></div>
									<div id="date-display"></div>
									<script>
										var today = new Date();
										var year = today.getFullYear();
										var month = today.getMonth() + 1;
										var day = today.getDate();
										var dayOfWeek = [ "Sunday", "Monday",
												"Tuesday", "Wednesday",
												"Thursday", "Friday",
												"Saturday" ][today.getDay()];
										$("#date-display").html(
												"<b>Today is: " + dayOfWeek
														+ " " + day + "-"
														+ month + "-" + year
														+ "</b>");
									</script>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!-- /page content -->
				<!-- footer content -->
				<footer>
				<div class="pull-right">&copy; 2017, Tike Jhya</div>
				<div class="clearfix"></div>
				</footer>
				<!-- /footer content -->
			</div>
		</div>
	</div>
</body>
</html>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
   "http://www.w3.org/TR/html4/loose.dtd">
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<html lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">

<spring:url value="/static/css/bootstrap.min.css" var="bootstrapCss" />
<spring:url value="/static/css/custom.css" var="customCss" />
<spring:url value="/static/css/font-awesome.min.css" var="fontawesomeCss" />
<spring:url value="/static/css/select2.min.css" var="selectCss" />
<spring:url value="/static/css/dropzone.min.css" var="dropzoneCss" />


<spring:url value="/static/js/jquery/jquery.min.js" var="jqueryJs" />
<spring:url value="/static/js/bootstrap/bootstrap.min.js" var="bootstrapJs" />
<spring:url value="/static/js/chart/chart.min.js" var="chartJs" />
<spring:url value="/static/js/moment/moment.min.js" var="momentJs" />
<spring:url value="/static/js/datepicker/daterangepicker.js" var="datepickerJs" />
<spring:url value="/static/js/jput/jput.min.js" var="jPutJs" />
<spring:url value="/static/js/table2excel/jquery.table2excel.min.js" var="tableToExcelJs" />
<spring:url value="/static/js/bootbox/bootbox.min.js" var="bootBoxJs" />
<spring:url value="/static/js/lists/countries.js" var="countriesJs" />
<spring:url value="/static/js/lists/districts.js" var="districtsJs" />

<spring:url value="/static/js/select2.min.js" var="selectJs" />
<spring:url value="/static/js/validator.min.js" var="validatorJs" />
<spring:url value="/static/js/json-object-manipulator.js" var="jsonObjectManipulatorJs" />
<spring:url value="/static/js/dropzone/dropzone.min.js" var="dropzoneJs" />
<spring:url value="/static/js/cytoscape/cytoscape.min.js" var="cytoscapeJs" />

<spring:url value="/static/js/custom.js" var="customJs" />
<spring:url value="/static/js/custom-ui.js" var="customUiJs" />

<spring:url value="/static/js/lists/lists.js" var="listsJs" />
<spring:url value="/static/js/pep/pep.js" var="pepJs" />
<spring:url value="/static/js/un/un.js" var="unJs" />

<spring:url value="/static/js/screening/screening-n-init.js" var="screeningNInitJs" />
<spring:url value="/static/js/screening/screening-n-get.js" var="screeningNGetJs" />
<spring:url value="/static/js/screening/screening-n-related.js" var="screeningNRelatedJs" />
<spring:url value="/static/js/screening/screening-n-post.js" var="screeningNPostJs" />
<spring:url value="/static/js/screening/screening-n-reply.js" var="screeningNReplyJs" />

<spring:url value="/static/js/screening/screening-l.js" var="screeningLJs" />
<spring:url value="/static/js/screening/screening-l-post.js" var="screeningLPostJs" />

<spring:url value="/static/js/kycn/kycn-post.js" var="kycnPostJs" />
<spring:url value="/static/js/kycn/kycn-get.js" var="kycnGetJs" />
<spring:url value="/static/js/kycn/kycn-refresh.js" var="kycnRefreshJs" />
<spring:url value="/static/js/kycl/kycl-post.js" var="kyclPostJs" />

<spring:url value="/static/js/kycl/kycl-init.js" var="kyclInitJs" />
<spring:url value="/static/js/kycl/kycl-get.js" var="kyclGetJs" />
<spring:url value="/static/js/kycl/kycl-post.js" var="kyclPostJs" />
<spring:url value="/static/js/kycl/kycl-refresh.js" var="kyclRefreshJs" />

<spring:url value="/static/images" var="images" />

<link href="${bootstrapCss}" rel="stylesheet" />
<link href="${customCss}" rel="stylesheet" />
<link href="${fontawesomeCss}" rel="stylesheet" />
<link href="${selectCss}" rel="stylesheet" />
<link href="${dropzoneCss}" rel="stylesheet" />

<script src="${jqueryJs}"></script>
<script src="${bootstrapJs}"></script>
<script src="${momentJs}"></script>
<script src="${chartJs}"></script>
<script src="${datepickerJs}"></script>
<script src="${jPutJs}"></script>
<script src="${tableToExcelJs}"></script>

<script src="${countriesJs}"></script>
<script src="${districtsJs}"></script>

<script src="${bootBoxJs}"></script>

<script src="${selectJs}"></script>
<script src="${customJs}"></script>
<script src="${customUiJs}"></script>
<script src="${validatorJs}"></script>
<script src="${jsonObjectManipulatorJs}"></script>
<script src="${dropzoneJs}"></script>
<script src="${cytoscapeJs}"></script>

<script src="${listsJs}"></script>
<script src="${pepJs}"></script>
<script src="${unJs}"></script>

<script src="${screeningNRelatedJs}"></script>
<script src="${screeningNGetJs}"></script>
<script src="${screeningNPostJs}"></script>
<script src="${screeningNReplyJs}"></script>
<script src="${screeningNInitJs}"></script>

<script src="${screeningLJs}"></script>
<script src="${screeningLPostJs}"></script>

<script src="${kycnPostJs}"></script>
<script src="${kycnGetJs}"></script>
<script src="${kycnRefreshJs}"></script>

<script src="${kyclInitJs}"></script>
<script src="${kyclGetJs}"></script>
<script src="${kyclPostJs}"></script>
<script src="${kyclRefreshJs}"></script>
<script type="text/javascript">
	//unlockRequestsOfThisUserFromKyclTbls();
</script>


<title>Tike Jhya</title>
</head>
<body class="nav-md">
<!-- Loading gif image -->
	<div class="pre-loader" style="display: none;">
	</div>
	<!-- Modal -->
	<div id='modal-template-div' style="display: none;" jput='modal-template'></div>
	<div id="modal-page" style="display: none;"></div>
	<div class="modal fade" tabindex="-1" role="dialog" id="message-modal" style="padding: 0px;">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title message-title">Modal title</h4>
				</div>
				<div class="modal-body message-body">
					<p>Modal Message</p>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				</div>
			</div>
			<!-- /.modal-content -->
		</div>
		<!-- /.modal-dialog -->
	</div>
	<!-- /.modal -->
	<div class="container body">
	<img src="${images}/tike-logo.png" style="height:250px; width:50%; margin-left:25%;"/>
		<div class="main_container" id="main_container">
			<nav class="navbar navbar-default">
			<div class="container-fluid">
				<ul class="nav navbar-nav">
					<li><a class="dropdown-toggle " data-toggle="dropdown" href="#"><b>Screening</b> <span class="caret"></span></a>
						<ul class="dropdown-menu">
							<li><a class="content-links" href="${pageContext.request.contextPath}/screening/reviewListForm"><b>View Open Account Request Reviews</b></a></li>
							<li><a class="content-links" href="${pageContext.request.contextPath}/screening/remittanceAndOthersListForm"><b>View Remittance and Other Reviews</b></a></li>
						</ul></li>
					<li><a class="dropdown-toggle " data-toggle="dropdown" href="#"><b>SWIFT</b> <span class="caret"></span></a>
						<ul class="dropdown-menu">
							<li><a class="content-links" href="${pageContext.request.contextPath}/swift/reviewListForm"><b>View SWIFT Reviews</b></a></li>
						</ul></li>
					<li><a class="dropdown-toggle " data-toggle="dropdown" href="#"><b>Virtual Account</b> <span class="caret"></span></a>
						<ul class="dropdown-menu">
							<li><a class="content-links" href="${pageContext.request.contextPath}/virtual-account/reviewListForm"><b>View Virtual Account Reviews</b></a></li>
						</ul></li>
					<li><a class="dropdown-toggle " data-toggle="dropdown" href="#"><b>Lists</b> <span class="caret"></span></a>
						<ul class="dropdown-menu">
							<li><a class="content-links" href="${pageContext.request.contextPath}/listsDashboardForm"><b>Lists Dashboard</b></a></li>
							<hr style="margin: 4px;" />
							<li><a class="content-links" href="${pageContext.request.contextPath}/pepSearchForm"><b>PEP Search</b></a></li>
							<li><a class="content-links" href="${pageContext.request.contextPath}/kycSearchForm"><b>KYC Search - Natural</b></a></li>
							<li><a class="content-links" href="${pageContext.request.contextPath}/kyclSearchForm"><b>KYC Search - Legal</b></a></li>
							<li><a class="content-links" href="${pageContext.request.contextPath}/unIndividualSearchForm"><b>UN Designated Individual Search</b></a></li>
							<li><a class="content-links" href="${pageContext.request.contextPath}/unEntitySearchForm"><b>UN Designated Entity Search</b></a></li>
						</ul></li>
				</ul>
				<div style="float: right; padding: 0px 10px; display: table-cell;">
					<h4>
						<span class="label"> <a class='btn btn-danger pull-right clear-active' href="${pageContext.request.contextPath}/logout"> <i class="fa fa-sing-out" aria-hidden="true"></i>Logout
						</a>
						</span> <span> <a class='btn btn-success pull-right' href="#" disabled>User logged in: <b>pageContext.request.userPrincipal.name</b></a>
						</span>
					</h4>
				</div>
			</div>
			</nav>
			<!-- page content -->
			<div class="right_col" id="right-col" role="main">
				<div class="">
					<div class="row" id="page-content">
						<div class="col-md-12 col-sm-12 col-xs-12" id="user-activity-base-div">
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
                                        var dayOfWeek = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ][today.getDay()];
                                        $("#date-display").html("<b>Today is: " + dayOfWeek + " " + day + "-" + month + "-" + year + "</b>");
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
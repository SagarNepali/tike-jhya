
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>


<!-- The Menu insert modal. Don't display it initially -->
<form id="add-menu-Form" method="post" class="form-horizontal"
	style="display: none;">
	<div class="form-group">
		<label class="col-xs-3 control-label">Item</label>
		<div class="col-xs-5">
			<input type="text" class="form-control" id="item" name="item"
				required="required" />
		</div>
	</div>

	<div class="form-group">
		<label class="col-xs-3 control-label">Item Code</label>
		<div class="col-xs-5">
			<input type="text" class="form-control" name="item-code"
				id="item-code" />
		</div>
	</div>
	<div class="form-group">
		<label class="col-xs-3 control-label">Description</label>
		<div class="col-xs-5">
			<input type="text" class="form-control" name="description"
				id="description" required="required" />
		</div>
	</div>
	<div class="form-group">
		<label class="col-xs-3 control-label">Category</label>
		<div class="col-xs-5">
			<select name="category-code" id="category-code">
				<option disabled="disabled">--- Select Category ---</option>
				<option value="F">Food</option>
				<option value="B">Beverage</option>
				<option value="T">Tobacco</option>
				<option value="O">Other</option>
			</select>
		</div>
	</div>
	<div class="form-group">
		<label class="col-xs-3 control-label">Rate</label>
		<div class="col-xs-5">
			<input type="number" class="form-control" name="rate" id="rate"
				required="required" />
		</div>
	</div>
	<div class="form-group">
		<label class="col-xs-3 control-label">Notes</label>
		<div class="col-xs-5">
			<input type="text" class="form-control" name="notes" id="notes" />
		</div>
	</div>
	<div class="form-group">
		<label class="col-xs-3 control-label">Status</label>
		<div class="col-xs-5">
			<input type="checkbox" checked="checked" value="true"
				class="form-control" name="status" id="status" />
		</div>
	</div>

	<div class="form-group">
		<div class="col-xs-5 col-xs-offset-3">
			<button type="submit" class="menu-save btn btn-success">Save</button>
			<button type="button" class="cancel btn btn-danger">Cancel</button>
		</div>
	</div>
</form>

<!-- The Menu insert modal. Don't display it initially -->
<form id="edit-menu-Form" method="post" class="form-horizontal"
	style="display: none;">
	
	<input type="hidden" id="edit-id" name="id"/>
	
	
	<div class="form-group">
		<label class="col-xs-3 control-label">Item</label>
		<div class="col-xs-5">
			<input type="text" class="form-control" id="edit-item" name="item"
				required="required" />
		</div>
	</div>

	<div class="form-group">
		<label class="col-xs-3 control-label">Item Code</label>
		<div class="col-xs-5">
			<input type="text" class="form-control" name="item-code"
				id="edit-item-code" />
		</div>
	</div>
	<div class="form-group">
		<label class="col-xs-3 control-label">Description</label>
		<div class="col-xs-5">
			<input type="text" class="form-control" name="description"
				id="edit-description" required="required" />
		</div>
	</div>
	<div class="form-group">
		<label class="col-xs-3 control-label">Category</label>
		<div class="col-xs-5">
			<select name="category-code" id="edit-category-code">
				<option disabled="disabled">--- Select Category ---</option>
				<option value="F">Food</option>
				<option value="B">Beverage</option>
				<option value="T">Tobacco</option>
				<option value="O">Other</option>
			</select>
		</div>
	</div>
	<div class="form-group">
		<label class="col-xs-3 control-label">Rate</label>
		<div class="col-xs-5">
			<input type="number" class="form-control" name="rate" id="edit-rate"
				required="required" />
		</div>
	</div>
	<div class="form-group">
		<label class="col-xs-3 control-label">Notes</label>
		<div class="col-xs-5">
			<input type="text" class="form-control" name="notes" id="edit-notes" />
		</div>
	</div>
	<div class="form-group">
		<label class="col-xs-3 control-label">Status</label>
		<div class="col-xs-5">
			<input type="checkbox" checked="checked" value="true"
				class="form-control" name="status" id="edit-status" />
		</div>
	</div>

	<div class="form-group">
		<div class="col-xs-5 col-xs-offset-3">
			<button type="submit" class="menu-edit btn btn-success">Save</button>
			<button type="button" class="cancel btn btn-danger">Cancel</button>
		</div>
	</div>
</form>

<div class="row">
	<div class="col-md-12 col-sm-12 col-xs-12">
		<div class="x_panel">
			<div class="x_title">
				<h2>
					<i class="fa fa-user" aria-hidden="true"></i> Category List
				</h2>
				<div class="clearfix"></div>
			</div>
			<div class="x_content">
				<!-- user Search form content -->
				<div class="x_panel">
					<div class="x_title">
						<h2>
							<small>To view details of the category, please click
								Detail button.</small>
						</h2>
						<div class="clearfix"></div>
					</div>
					<div class="x_content">


						<button id="add-menu" name="add-menu-button" value="btn"
							class="btn btn-primary">Add new item</button>
						<div class="container-fluid">
							<div= "table-area">
								<table id="menuTable" class="table table-bordered table-striped">
									<thead>
										<tr>
											<td>Id</td>
											<td>Item Code</td>
											<th>Item</th>
											<th>Description</th>
											<th>Category</th>
											<th>Rate</th>
											<th>Added Date</th>
											<th>Modified Date</th>
											<th>Status</th>
											<th>Action</th>
										</tr>
									</thead>

									<c:forEach items="${menus }" var="menu">
										<tr>
											<td class="edit-id" >${menu.id }</td>
											<td>${menu.itemCode }</td>
											<td>${menu.item }</td>
											<td>${menu.description }</td>
											<td><c:choose>
													<c:when test="${menu.category.code =='F' }">
													Food
												</c:when>
													<c:when test="${menu.category.code =='B' }">
													Beverage
												</c:when>
													<c:when test="${menu.category.code =='O' }">
													Other
												</c:when>
													<c:when test="${menu.category.code =='T' }">
													Tobacco
												</c:when>
												</c:choose>
											</td>
											<td>${menu.rate }</td>
											<td>${menu.addedDate}</td>
											<td>${menu.modifiedDate}</td>
											<c:choose>
												<c:when test="${category.status }">
													<td class="edit-status" val="${category.status }" ><span class='label label-success'>Available</span></td>
												</c:when>
												<c:otherwise>
													<td class="edit-status" val="${category.status }"><span class='label label-danger'>Not
															Available</span></td>
												</c:otherwise>
											</c:choose>
											<td><span class="btn btn-warning btn-sm" id="edit-item-action"><i
													class="fa fa-pencil fa-fw" aria-hidden="true"></i>&nbsp;
													Edit</span> <span class="btn btn-danger btn-sm" id="disable-item"><i
													class="fa fa-pencil fa-fw" aria-hidden="true"></i>&nbsp;
													Disable </span></td>
										</tr>
									</c:forEach>

								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<script>


	var menuTable = $("#menuTable").dataTable();

	$(document).off("click", "#add-menu").on("click", "#add-menu", function() {
		$("#table-area").hide();
		bootbox.dialog({
			title : 'Add menu item',
			message : $('#add-menu-Form'),
			show : false
		/* We will show it manually later */
		}).on('shown.bs.modal', function() {
			$('#add-menu-Form').show(); /* Show the login form */
			// .formValidation('resetForm', true); /* Reset form */
		}).on('hide.bs.modal', function(e) {
			/**
			 * Bootbox will remove the modal (including the body which contains the login form)
			 * after hiding the modal
			 * Therefor, we need to backup the form
			 */
			$('#add-menu-Form').hide().appendTo('#page-content');
		}).modal('show');
	});
	
	$(document).off("click", "#edit-item-action").on("click", "#edit-item-action", function() {
		
		var row = $(this).closest('tr').find('.edit-id').text();
		$("#edit-id").val(row);
		
		$.post("./menu/getById/"+row,function(data){
			
			console.log(data)
			
			$("#edit-item").val(data.item);
			$("#edit-item-code").val(data["item-code"]);
			$("#edit-description").val(data.description);
			$("#edit-category-code").val(data.category.code);
			$("#edit-rate").val(data.rate);
			$("#edit-notes").val(data.notes);
			if(data.status){
				$("#edit-status").val("true");
				
			}else{
				$("#edit-status").prop("checked",false);
				$("#edit-status").val("false");
			}
			
			
		});
		
		$("#table-area").hide();
		bootbox.dialog({
			title : 'Edit menu item',
			message : $('#edit-menu-Form'),
			show : false
		/* We will show it manually later */
		}).on('shown.bs.modal', function() {
			$('#edit-menu-Form').show(); /* Show the login form */
			// .formValidation('resetForm', true); /* Reset form */
		}).on('hide.bs.modal', function(e) {
			/**
			 * Bootbox will remove the modal (including the body which contains the login form)
			 * after hiding the modal
			 * Therefor, we need to backup the form
			 */
			$('#edit-menu-Form').hide().appendTo('#page-content');
		}).modal('show');
	});


	$(".menu-save").click(function() {

		var item = $("#item").val();
		var itemCode = $("#item-code").val();
		var description = $("#description").val();
		var categoryCode = $("#category-code").val();
		var notes = $("#notes").val();
		var status = false;
		var rate = $("#rate").val();

		if ($("#status").prop("checked")) {
			status = true;
		} else {
			status = false;
		}

		var request = {
			"item" : item,
			"item-code" : itemCode,
			"description" : description,
			"notes" : notes,
			"rate" : rate,
			"status" : status,
			"category" : {
				"code" : categoryCode
			}
		}

		$.ajax({

			url : "./menu/save",
			method : "POST",
			data : JSON.stringify(request),
			contentType : "application/json; charset=utf-8",
			dataType : "json",

		}).done(function(response) {
			$("#insertModal").modal("hide");
			if (response === 1) {
				var dialog = bootbox.dialog({
					size : "small",
					title : 'Success',
					message : 'Menu item Inserted sucessfully',
					buttons : {
						confirm : {
							label : 'ok',
							className : 'btn-primary'
						}
					}
				});
			} else {

				var dialog = bootbox.dialog({
					size : "small",
					title : 'Error',
					message : 'Menu item could not be saved',
					buttons : {
						confirm : {
							label : 'ok',
							className : 'btn-primary'
						}
					}
				});
			}
			menuTable.ajax.reload();
		}).fail(function(data) {
			console.log("Netork Server Error");
		});

	});
	
	$(".menu-edit").click(function() {
		
		var id = $("#edit-id").val();
		var item = $("#edit-item").val();
		var itemCode = $("#edit-item-code").val();
		var description = $("#edit-description").val();
		var categoryCode = $("#edit-category-code").val();
		var notes = $("#edit-notes").val();
		var status = false;
		var rate = $("#edit-rate").val();

		if ($("#edit-status").prop("checked")) {
			status = true;
		} else {
			status = false;
		}

		var request = {
			"item" : item,
			"id":id,
			"item-code" : itemCode,
			"description" : description,
			"notes" : notes,
			"rate" : rate,
			"status" : status,
			"category" : {
				"code" : categoryCode
			}
		}

		$.ajax({

			url : "./menu/save",
			method : "POST",
			data : JSON.stringify(request),
			contentType : "application/json; charset=utf-8",
			dataType : "json",

		}).done(function(response) {
			$("#insertModal").modal("hide");
			if (response === 1) {
				var dialog = bootbox.dialog({
					size : "small",
					title : 'Success',
					message : 'Menu item Inserted sucessfully',
					buttons : {
						confirm : {
							label : 'ok',
							className : 'btn-primary'
						}
					}
				});
			} else {

				var dialog = bootbox.dialog({
					size : "small",
					title : 'Error',
					message : 'Menu item could not be saved',
					buttons : {
						confirm : {
							label : 'ok',
							className : 'btn-primary'
						}
					}
				});
			}
			menuTable.ajax.reload();
		}).fail(function(data) {
			console.log("Netork Server Error");
		});

	});
	
	$(document).off("click", "#disable-item").on("click", "#disable-item", function() {
			
			var id = $(this).closest('tr').find('.edit-id').text();
			var status = $(this).closest('tr').find(".edit-status").text();
			
			alert(status)
			
			$.post('./menu/changeStatus/'+id/status,function(){
				$.get("./menu/list");
			})

	});
	
</script>
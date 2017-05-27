<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>

<spring:url value="/static/js/category/category.js" var="categoryJS" />

<script src="${categoryJS}"></script>

<style>
.input-format {
	border: none;
	background: #F7F7F7;
}

.toolbar {
	float: left;
}
</style>


<!-- Category Insert Form Modal -->

<div class="modal fade" id="insertModal" tabindex="-1" data-backdrop="false" role="dialog" aria-labelledby="exampleModalLabel">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
				<h4 class="modal-title">Insert Category Detail</h4>
			</div>
			<form id="insertEnumForm" autocomplete="off">
				<div class="modal-body">


					<div class="form-group">
						<label for="insert-enum-val" class="control-label">Category Code:<span style="color: #FF0000;"> *</span></label> <input type="text" class="form-control" id="insert-enum-val" name="insert-enum-val" placeholder="Cateogry Code" required="required"></input>
						
					</div>
					<label style="display: none;" class="error" for="insert-enum-val" id="enum-val-error"></label>

					<div class="form-group">
						<label for="insert-description" class="control-label">Description:</label>
						<textarea id="insert-description" placeholder="Description..." class="form-control" rows="3" required></textarea>
					</div>


					<div class="form-group">
						<label for="status" class="control-label">Status:</label> <label class="radio-inline"> <input type="radio" name="insert-optradio" value="true" required="required">Active
						</label> <label class="radio-inline"> <input type="radio" name="insert-optradio" value="false" required="required">Deactive
						</label>
					</div>

				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
					<span><button id="btn-insert" type="submit" class="btn btn-primary">Save</button></span>
				</div>
			</form>
		</div>
	</div>
</div>


<!-- Category Insert Form Modal End Here -->

<!-- Bulk Update Information  -->
<div class="modal fade" id="bulkModal" tabindex="-1" role="dialog" data-backdrop="false" aria-labelledby="exampleModalLabel">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<form id="bulkUpdateForm" autocomplete="off">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title">Confirmation</h4>
				</div>
				<div class="modal-body">

					<div class="form-group">
						<label for="reason" class="control-label">Reason:<span style="color: #FF0000;"> *</span></label>
						<textarea id="bulk-reason" placeholder="Provide Possible Reason For Update..." class="form-control" rows="3" required></textarea>
					</div>
					<div class="form-group">
						<div class="checkbox">
							<label class="control-label"> <input id="bulk-confirm" type="checkbox" required="required"> Confirm new value is approved
							</label>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
					<span><button id="btn-bulk-update" type="submit" class="btn btn-primary">Update</button></span>
				</div>
			</form>
		</div>
	</div>
</div>


<!-- Category Update Modal -->

<div class="modal fade" id="myModal" tabindex="-1" role="dialog" data-backdrop="false" aria-labelledby="exampleModalLabel">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<form id="enumform" autocomplete="off">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title" id="exampleModalLabel">Update Possible Value</h4>
				</div>

				<div class="modal-body">

					<div class="form-group">
						<label for="recipient-name" class="control-label">Relation Name:</label> <span id="realtion-name"><label class="control-label"></label></span>
					</div>

					<div class="form-group">
						<label for="enumcode" class="control-label">Enum Code:</label> <input type="text" class="form-control" id="enum-val" disabled="disabled">
					</div>

					<div class="form-group">
						<label for="description" class="control-label">Description:</label>
						<textarea id="description" placeholder="Description..." class="form-control" rows="3" required></textarea>
					</div>

					<div class="form-group">
						<label for="reason" class="control-label">Reason:<span style="color: #FF0000;"> *</span></label>
						<textarea id="reason" placeholder="Provide Possible Reason For Update..." class="form-control" rows="3" required></textarea>
					</div>

					<div class="form-group">
						<label for="status" class="control-label">Status:</label> <label class="radio-inline"> <input type="radio" name="optradio" value="true">Active
						</label> <label class="radio-inline"> <input type="radio" name="optradio" value="false">Deactive
						</label>
					</div>
					<div class="form-group">
						<div class="checkbox">
							<label class="control-label"> <input id="confirm" type="checkbox"> Confirm new value is approved
							</label>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
					<span><button id="btn-update" type="submit" class="btn btn-primary">Update</button></span>
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
					<i class="fa fa-user" aria-hidden="true"></i> Types List
				</h2>
				<div class="clearfix"></div>
			</div>
			<div class="x_content">
				<!-- user Search form content -->
				<div class="x_panel">
					<div class="x_title">
						<h2>
							<small>To update value of a type, please click update for the respective type.</small>
						</h2>
						<div class="clearfix"></div>
					</div>
					<div class="x_content">
						<a href="./enum/list" class="btn btn-primary content-links" style="float: right;"> <span class="glyphicon glyphicon-chevron-left"></span> Back
						</a>


						<button type="button" id="insert" class="btn btn-info" style="float: left;">New Type</button>
						<span><button type="button" id="updateAll" class="btn btn-info" disabled style="float: right;">Update All</button></span> <br />
						<br />
						<br />
						<div class="container-fluid">
						<table id="categoryDetail" class="table table-bordered table-striped">
							<thead>
								<tr>
									<th></th>
									<th>Type</th>
									<th>Description</th>
									<th>Status</th>
									<th>Disable Date</th>
									<th>Update</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td class="checkbox"></td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
								</tr>
							</tbody>

						</table>
						
						<!-- <table id="categoryAdvanceDetail" class="table table-bordered table-striped">
							<thead>
								<tr>
									<th></th>
									<th>Type</th>
									<th>Description</th>
									<th>Status</th>
									<th>Label</th>
									<th>Disable Date</th>
									<th>Update</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td class="checkbox"></td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
								</tr>
							</tbody>

						</table> -->
						
						
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
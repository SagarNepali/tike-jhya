
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<!-- 
<spring:url value="/static/js/category/category.js" var="categoryJS" />
<script src="${categoryJS}"></script>
 -->




<div class="modal fade" id="insertModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
				<h4 class="modal-title" id="exampleModalLabel">Update Possible Value</h4>
			</div>
			<form id="enumform" autocomplete="off">
				<div class="modal-body">

					<div class="form-group">
						<label for="recipient-name" class="control-label">Relation Name:</label> <span id="relation-name"><label class="control-label"></label></span>
					</div>

					<div class="form-group">
						<label for="enumcode" class="control-label">Enum Code:</label> <input type="text" class="form-control" id="enum-val" required="required">
					</div>

					<div class="form-group">
						<label for="description" class="control-label">Description:</label>
						<textarea id="description" placeholder="Description..." class="form-control" rows="3" required></textarea>
					</div>


					<div class="form-group">
						<label for="status" class="control-label">Status:</label> <label class="radio-inline"> <input type="radio" name="optradio" value="true">Active
						</label> <label class="radio-inline"> <input type="radio" name="optradio" value="false">Deactive
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
                            <small>To view details of the category, please click Detail button.</small>
                        </h2>
                        <div class="clearfix"></div>
                    </div>
                    <div class="x_content">                     


               <button id="category-table" name="select-button" value="btn" style="display: none"></button>
               <div class="container-fluid">
                <table id="categoryTable" class="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>Category Code</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    
                    <c:forEach items="${categories }" var="category">
                    	<tr>
                    		<td>${category.code }</td>
                    		<td>${category.description }</td>
                    		
                    		<c:choose>
								<c:when test="${category.status }">
									<td><span class='label label-success'>Activated</span></td>
								</c:when>

								<c:otherwise>
									<td><span class='label label-danger'>Deactivated</span></td>
								</c:otherwise>
							</c:choose>
                    		<td></td>
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

<script>

$("#categoryTable").dataTable();
</script>
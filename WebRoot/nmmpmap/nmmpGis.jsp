<%@ page language="java" contentType="text/html;charset=UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>NMMP-GIS</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link rel='stylesheet' href='<%=request.getContextPath()%>/bootstrap3.3.7/css/bootstrap.min.css?ver=beta' type='text/css' media='all' />
<link href="<%=request.getContextPath()%>/bootstrap3.3.7/css/bootstrap-table.css" rel="stylesheet" /> 
<link href="<%=request.getContextPath()%>/bootstrap3.3.7/css/bootstrap-select.min.css" rel="stylesheet" /> 
<link href="<%=request.getContextPath()%>/bootstrap3.3.7/css/bootstrap-datetimepicker.min.css" rel="stylesheet" /> 
<link href="<%=request.getContextPath()%>/jquery/css/jquery-ui.min.css" rel="stylesheet" /> 
<link href="<%=request.getContextPath()%>/jquery/css/ui.jqgrid.css" rel="stylesheet" />
<link href="css/nmmpmap.css" rel="stylesheet" />

<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=oVBzO3eixTzpDC3G5Nt0BO19tuAgqxxu"></script>
<script src="<%=request.getContextPath()%>/jquery/jquery.min.js"></script> 
<script type='text/javascript' src='<%=request.getContextPath()%>/bootstrap3.3.7/js/bootstrap.min.js?ver=beta'></script>
<script type='text/javascript' src='<%=request.getContextPath()%>/bootstrap3.3.7/js/bootstrap-table.js?ver=beta'></script>
<script type='text/javascript' src='<%=request.getContextPath()%>/bootstrap3.3.7/js/bootstrap-table-zh-CN.js?ver=beta'></script>
<script type='text/javascript' src='<%=request.getContextPath()%>/bootstrap3.3.7/js/bootstrap-select.min.js?ver=beta'></script>
<script type='text/javascript' src='<%=request.getContextPath()%>/bootstrap3.3.7/js/moment.min.js?ver=beta'></script>
<script type='text/javascript' src='<%=request.getContextPath()%>/bootstrap3.3.7/js/moment-with-locales.min.js?ver=beta'></script>
<script type='text/javascript' src='<%=request.getContextPath()%>/bootstrap3.3.7/js/bootstrap-datetimepicker.min.js?ver=beta'></script>
<script type='text/javascript' src='<%=request.getContextPath()%>/bootstrap3.3.7/js/locales/bootstrap-datetimepicker.zh-CN.js?ver=beta'></script>
<script type='text/javascript' src='<%=request.getContextPath()%>/bootstrap3.3.7/js/defaults-zh_CN.js?ver=beta'></script>
<script type="text/javascript" src="js/nmmpGis.js"></script>
<script language="javascript">
	var basePath='<%=request.getContextPath()%>';
</script>
</head>

<body style="background-color:white;">
	<nav class="navbar navbar-default" role="navigation">  
 			<div class="container-fluid"> 
		   <div class="navbar-header">  
		      <a class="navbar-brand" href="#"><span class="glyphicon glyphicon-globe" aria-hidden="true"></span>NMMP-GIS</a>  
		   </div>  
		   <div>  
		      <ul class="nav navbar-nav">  
		         <li class="active"><a href="#person" data-toggle="tab"><span class="glyphicon glyphicon-user" aria-hidden="true"></span>代维人员</a></li>  
		         <li><a href="#task" data-toggle="tab"><span class="glyphicon glyphicon-briefcase" aria-hidden="true"></span>巡检任务</a></li>
				 <li><a href="#resource" data-toggle="tab"><span class="glyphicon glyphicon-dashboard" aria-hidden="true"></span>资源管理</a></li>
		      	 <li><a href="#qiandao" data-toggle="tab"><span class="glyphicon glyphicon-user" aria-hidden="true"></span>签到管理</a></li>
		      	 <li><a href="#resourceXl" data-toggle="tab"><span class="glyphicon glyphicon-dashboard" aria-hidden="true"></span>光缆资源</a></li>
		      </ul>  
		   </div> 
	  </div> 
	</nav>
	<div id="myTabContent" class="tab-content">
			<div class="tab-pane fade in active" id="person"> 
				<div class="accordion" id="accordion2">
					<div class="accordion-group">
						<div class="accordion-heading">
							<div class="panel panel-primary">
								<div class="panel-heading">
								    <font><span class="glyphicon glyphicon-user" aria-hidden="true"></span>代维人员列表</font>
									<a class="accordion-toggle" style="float:right;" data-toggle="collapse" data-parent="#accordion2" href="#collapseOne">
										<font color="white"><span class="glyphicon glyphicon-chevron-down" aria-hidden="true"></span>点击展开</font>
									</a>
								</div>
							</div>
						</div>
						<div id="collapseOne" class="accordion-body collapse" style="height: 0px; ">
							<div class="accordion-inner">
								 <div class="container-fluid">
								 	 <form class="form-inline">
									      <div class="form-group">
									        <label for="">名称</label><input id="personname" type="text" class="form-control" style="width:135px" placeholder="请输入人员名称">
								          </div>
										  <div class="form-group" style="margin:10px;display:inline;">
										    <label>所属地市</label>
										    <select class="form-control" style="width:135px" id="personcity">
												    <option value="chc">长春市</option>
													<option value="jil">吉林市</option>
													<option value="yanb">延边州</option>
													<option value="sip">四平市</option>
													<option value="tongh">通化市</option>
													<option value="baic">白城市</option>
													<option value="sony">松原市</option>
													<option value="liy">辽源市</option>
													<option value="bais">白山市</option>
											</select>
										  </div>
										  <div class="form-group" style="margin:5px;display:inline;">
										    <label>所属单位</label>
										    <select id="companySel" class="form-control" style="width:135px">
											</select>
										  </div>
										  <div class="form-group" style="margin:5px;display:inline;">
										    <label>所属驻地</label>
										    <select id="departSel" class="form-control" style="width:135px">
											</select>
										  </div>
										  <div class="form-group" style="margin:10px;display:inline;">
											    <label>巡检时间</label>
											    <div class='input-group date' id="per_start" style="width:155px">  
									                <input type='text' class="form-control"/>  
									                <span class="input-group-addon">  
									                    <span class="glyphicon glyphicon-calendar"></span>  
									                </span>  
									            </div>
					 						    <label for="">至</label>
											    <div class='input-group date' id='per_end' style="width:155px">  
									                <input type='text' class="form-control" />  
									                <span class="input-group-addon">  
									                    <span class="glyphicon glyphicon-calendar"></span>  
									                </span>  
									            </div>
										  </div>
										  <div class="form-group"></div>
										  <button id="person-serach" type="button" class="btn btn-primary "><span class="glyphicon glyphicon-search" aria-hidden="true"></span>搜索</button>
							      </form>
								</div>
								<div class="container-fluid">
									<table id="person_tabel"></table>
								</div>
							</div>
						</div>
					</div>
				</div>
				<hr class="color:#bf16e7"/>
				<div class="panel panel-primary">
					 <div class="panel-heading">
					 	<font><span class="glyphicon glyphicon-user" aria-hidden="true"></span>电子地图</font>
					 </div>
					 <div class="panel-body">
						 <div class="container-fluid">
					         <div id="personmap" class="map"></div>
					     </div>
				     </div>
				</div>
			</div>
			<div class="tab-pane fade" id="task"> 
				<div class="accordion" id="accordion3">
					<div class="accordion-group">
						<div class="accordion-heading">
							<div class="panel panel-primary">
								<div class="panel-heading">
								    <font><span class="glyphicon glyphicon-briefcase" aria-hidden="true"></span>巡检任务列表</font>
									<a class="accordion-toggle" style="float:right;" data-toggle="collapse" data-parent="#accordion3" href="#taskPanel">
										<font color="white"><span class="glyphicon glyphicon-chevron-down" aria-hidden="true"></span>点击展开</font>
									</a>
								</div>
							</div>
						</div>
						<div id="taskPanel" class="accordion-body collapse" style="height: 0px; ">
							<div class="accordion-inner">
								<div class="container-fluid">
								 	  <form class="form-inline">
									      	<div class="form-group">
									      		<label for="">名称</label><input id="taskname" type="text" class="form-control" placeholder="请输入任务名称">
								            </div>
											<div class="form-group" style="margin:10px;display:inline;">
											    <label>所属地市</label>
											    <select class="form-control" style="width:145px" id="taskcity">
													<option value="chc">长春市</option>
													<option value="jil">吉林市</option>
													<option value="yanb">延边州</option>
													<option value="sip">四平市</option>
													<option value="tongh">通化市</option>
													<option value="baic">白城市</option>
													<option value="sony">松原市</option>
													<option value="liy">辽源市</option>
													<option value="bais">白山市</option>
												</select>
											  </div>
											  <div class="form-group" style="margin:5px;display:inline;">
											    <label>任务类型</label>
											    <select class="form-control" style="width:145px" id="taskType">
													  <option value="002">线路巡检</option>
													  <option value="001">基站巡检</option>
													  <option value="003">室分巡检</option>
													  <option value="004">直放站巡检</option>
													  <option value="005">机房/局站巡检</option>
												</select>
											  </div>
											  <div class="form-group" style="margin:10px;display:inline;">
											    <label>任务时间</label>
											    <div class='input-group date' id='task_start' style="width:160px">  
									                <input type='text' class="form-control" />  
									                <span class="input-group-addon">  
									                    <span class="glyphicon glyphicon-calendar"></span>  
									                </span>  
									            </div>
											    <label for="">至</label>
											    <div class='input-group date' id='task_end' style="width:160px">  
									                <input type='text' class="form-control" />  
									                <span class="input-group-addon">  
									                    <span class="glyphicon glyphicon-calendar"></span>  
									                </span>  
									            </div>
											  </div>
											  <div class="form-group"></div>
											  <button id="task-serach" type="button" class="btn btn-primary "><span class="glyphicon glyphicon-search" aria-hidden="true"></span>搜索</button>
								     </form>
								</div>
								<div class="container-fluid">
									<table id="task_tabel"></table>
								</div>
							</div>
						</div>
					</div>
				</div>
				<hr class="color:#bf16e7"/>
				<div class="panel panel-primary">
					 <div class="panel-heading">
					 	<font><span class="glyphicon glyphicon-briefcase" aria-hidden="true"></span>电子地图</font>
					 </div>
					 <div class="panel-body">
						<div class="container-fluid">
						 	<div id="taskmap" class="map"></div>
						</div>
				     </div>
				</div>
			</div>
			<div class="tab-pane fade" id="resource"> 
				<div class="accordion" id="accordion4">
					<div class="accordion-group">
						<div class="accordion-heading">
							<div class="panel panel-primary">
								<div class="panel-heading">
								    <font><span class="glyphicon glyphicon-dashboard" aria-hidden="true"></span>资源列表</font>
									<a class="accordion-toggle" style="float:right;" data-toggle="collapse" data-parent="#accordion3" href="#sourcePanel">
										<font color="white"><span class="glyphicon glyphicon-chevron-down" aria-hidden="true"></span>点击展开</font>
									</a>
								</div>
							</div>
						</div>
						<div id="sourcePanel" class="accordion-body collapse" style="height: 0px; ">
							<div class="accordion-inner">
								 <div class="container-fluid">
								 	<form class="form-inline">
								 		<div class="form-group">
								      		<label for="">名称</label>
								      		<input id="resourcename" type="text" class="form-control" placeholder="请输入资源名称">
							            </div>
										<div class="form-group" style="margin:10px;display:inline;">
											<label>所属地市</label>
											<select id="resourcecity" class="form-control" style="width:150px">
												<option city="431" value="chc">长春市</option>
												<option city="432" value="jil">吉林市</option>
												<option city="433" value="yanb">延边州</option>
												<option city="434" value="sip">四平市</option>
												<option city="435" value="tongh">通化市</option>
												<option city="436" value="baic">白城市</option>
												<option city="437" value="sony">松原市</option>
												<option city="438" value="liy">辽源市</option>
												<option city="439" value="bais">白山市</option>
											</select>
										</div>
										 <div class="form-group" style="margin:5px;display:inline;">
										    <label>所属单位</label>
										    <select id="rescompany" class="form-control" style="width:135px">
											</select>
										 </div>
										<div class="form-group" style="margin:10px;display:inline;">
											<label>资源类型</label>
											<select id="resourcetype" class="form-control" style="width:150px">
												<option value="jz">基站</option>
												<option value="sf">室分</option>
												<option value="zfz">直放站</option>
												<option value="rsj">人手井</option>
												<!--<option value="gdd">管道段</option>-->
												<option value="dg">电杆</option>
												<!--<option value="gl">杆路</option>-->
												<option value="bs">标石</option>
												<!-- <option value="jf">机房</option> -->
												<!-- <option value="zmd">直埋段</option> -->
											</select>
										</div>
										 <div class="form-group" style="margin:5px;display:inline;">
										    <label>巡检状态</label>
										    <select id="inspectstate" class="form-control" style="width:135px">
										    	<option value="">请选择</option>
										    	<option value="true">已巡检</option>
										    	<option value="false">未巡检</option>
											</select>
										 </div>
										<div class="form-group" style="margin:5px;display:inline;">
											<label>巡检时间</label>
											<div class='input-group date' id='resourceMonth' style="width:160px">  
									                <input type='text' class="form-control" id='resourcemonth'  />  
									                <span class="input-group-addon">  
									                    <span class="glyphicon glyphicon-calendar"></span>  
									                </span>  
									            </div>
										</div>
										<div class="form-group" style="margin:5px;display:inline;"></div>
										
								     </form>
								 </div>
								  <div class="container-fluid" align="right">
									<button id="res-serach" type="button" class="btn btn-primary "><span class="glyphicon glyphicon-search" aria-hidden="true"></span>搜索</button>
								</div>
								 <div class="container-fluid">
									<table id="resource_tabel"></table>
								</div>
							</div>
						</div>
					</div>
				</div>
				<hr class="color:#bf16e7"/>
				<div class="panel panel-primary">
					 <div class="panel-heading">
					 	<font><span class="glyphicon glyphicon-dashboard" aria-hidden="true"></span>电子地图</font>
					 </div>
					 <div class="panel-body">
						<div class="container-fluid">
						 	<div id="resourcemap" class="map"></div>
						</div>
				     </div>
				</div>
			</div>
			<div class="tab-pane fade" id="qiandao"> 
				<div class="accordion" id="accordion5">
					<div class="accordion-group">
						<div class="accordion-heading">
							<div class="panel panel-primary">
								<div class="panel-heading">
								    <font><span class="glyphicon glyphicon-user" aria-hidden="true"></span>代维人员列表</font>
									<a class="accordion-toggle" style="float:right;" data-toggle="collapse" data-parent="#accordion5" href="#collapseQiandao">
										<font color="white"><span class="glyphicon glyphicon-chevron-down" aria-hidden="true"></span>点击展开</font>
									</a>
								</div>
							</div>
						</div>
						<div id="collapseQiandao" class="accordion-body collapse" style="height: 0px; ">
							<div class="accordion-inner">
								 <div class="container-fluid">
								 	 <form class="form-inline">
									      <div class="form-group">
									        <label for="">名称</label><input id="personname2" type="text" class="form-control" style="width:135px" placeholder="请输入人员名称">
								          </div>
										  <div class="form-group" style="margin:10px;display:inline;">
										    <label>所属地市</label>
										    <select class="form-control" style="width:135px" id="personcity2">
												    <option value="chc">长春市</option>
													<option value="jil">吉林市</option>
													<option value="yanb">延边州</option>
													<option value="sip">四平市</option>
													<option value="tongh">通化市</option>
													<option value="baic">白城市</option>
													<option value="sony">松原市</option>
													<option value="liy">辽源市</option>
													<option value="bais">白山市</option>
											</select>
										  </div>
										  <div class="form-group" style="margin:5px;display:inline;">
										    <label>所属单位</label>
										    <select id="companySel2" class="form-control" style="width:135px">
											</select>
										  </div>
										  <div class="form-group" style="margin:5px;display:inline;">
										    <label>所属驻地</label>
										    <select id="departSel2" class="form-control" style="width:135px">
											</select>
										  </div>
										  <div class="form-group" style="margin:10px;display:inline;">
											    <label>签到日期</label>
											    <div class='input-group date' id="per_qiandao" style="width:155px">  
									                <input type='text' class="form-control"/>  
									                <span class="input-group-addon">  
									                    <span class="glyphicon glyphicon-calendar"></span>  
									                </span>  
									            </div>
					 						   
										  </div>
										   
										  <div class="form-group"></div>
										  <button id="qiandao-serach" type="button" class="btn btn-primary "><span class="glyphicon glyphicon-search" aria-hidden="true"></span>搜索</button>
							      </form>
								</div>
								<div class="container-fluid">
									<table id="qiandao_tabel"></table>
								</div>
							</div>
						</div>
					</div>
				</div>
				<hr class="color:#bf16e7"/>
				<div class="panel panel-primary">
					 <div class="panel-heading">
					 	<font><span class="glyphicon glyphicon-user" aria-hidden="true"></span>电子地图</font>
					 </div>
					 <div class="panel-body">
						 <div class="container-fluid">
					         <div id="qiandaopersonmap" class="map"></div>
					     </div>
				     </div>
				</div>
			</div>
			<%-- 光缆资源--20191230addbylqb --%>
			<div class="tab-pane fade" id="resourceXl"> 
				<div class="accordion" id="accordion5">
					<div class="accordion-group">
						<div class="accordion-heading">
							<div class="panel panel-primary">
								<div class="panel-heading">
								    <font><span class="glyphicon glyphicon-dashboard" aria-hidden="true"></span>资源列表</font>
									<a class="accordion-toggle" style="float:right;" data-toggle="collapse" data-parent="#accordion3" href="#sourcePanelXl">
										<font color="white"><span class="glyphicon glyphicon-chevron-down" aria-hidden="true"></span>点击展开</font>
									</a>
								</div>
							</div>
						</div>
						<div id="sourcePanelXl" class="accordion-body collapse" style="height: 0px; ">
							<div class="accordion-inner">
								 <div class="container-fluid">
								 	<form class="form-inline">
										<div class="form-group" style="margin:10px;display:inline;">
											<label>所属地市</label>
											<select id="resourcecityxl" class="form-control" style="width:150px">
												<option value="431" >长春市</option>
												<option value="432" >吉林市</option>
												<option value="433" >延边州</option>
												<option value="434" >四平市</option>
												<option value="435" >通化市</option>
												<option value="436" >白城市</option>
												<option value="437" >松原市</option>
												<option value="438" >辽源市</option>
												<option value="439" >白山市</option>
											</select>
										</div>
										<div class="form-group" style="margin:10px;display:inline;">
											<label>光缆名称</label>
											<select id="resourcetypexl" class="form-control" style="width:150px">
												<option value="">请选择</option>
											</select>
										</div>
										
										<div class="form-group" style="margin:5px;display:inline;"></div>
										<div class="form-group" align="right">
									<button id="resxl-serach" type="button" class="btn btn-primary "><span class="glyphicon glyphicon-search" aria-hidden="true"></span>搜索</button>
								</div>
								     </form>
								 </div>
								  
								 <div class="container-fluid">
									<table id="resource_tabelXl"></table>
								</div>
							</div>
						</div>
					</div>
				</div>
				<hr class="color:#bf16e7"/>
				<div class="panel panel-primary">
					 <div class="panel-heading">
					 	<font><span class="glyphicon glyphicon-dashboard" aria-hidden="true"></span>电子地图</font>
					 </div>
					 <div class="panel-body">
						<div class="container-fluid">
						 	<div id="resourcemapxl" class="map"></div>
						</div>
				     </div>
				</div>
			</div>
	</div>
</body>
</html>

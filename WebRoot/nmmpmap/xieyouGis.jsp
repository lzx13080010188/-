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
<script language="javascript">
	var basePath='<%=request.getContextPath()%>';
	var wc_id = <%=request.getParameter("pid") %>;
	console.log(wc_id);
</script>
<script type="text/javascript" src="js/xieyouGis.js"></script>
</head>

<body style="background-color:white;">
	<nav class="navbar navbar-default" role="navigation">  
 			<div class="container-fluid"> 
		   <div class="navbar-header">  
		      <a class="navbar-brand" href="#"><span class="glyphicon glyphicon-globe" aria-hidden="true"></span>NMMP-GIS</a>  
		   </div>  
		   <div>  
		      <ul class="nav navbar-nav">  
		      	 <li><a href="#qiandao" data-toggle="tab"><span class="glyphicon glyphicon-user" aria-hidden="true"></span>工单任务线路巡检</a></li>
		      </ul>  
		   </div> 
	  </div> 
	</nav>
	<div id="myTabContent" class="tab-content">
			<div class="tab-pane fade in active" id="qiandao"> 
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
	</div>
</body>
</html>

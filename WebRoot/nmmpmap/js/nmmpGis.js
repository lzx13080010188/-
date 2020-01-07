var map;
var mapdiv="personmap";
var personId;
var taskId;
var taskType;
var x_pi = 3.14159265358979324 * 3000.0 / 180.0;
var PI = 3.1415926535897932384626;
var a = 6378245.0;
var ee = 0.00669342162296594323;
var pointLineArr=new Array();
var pointLineArr2=new Array();
var infoWindow;
var glFlag;
/**
 * nmmpGIS初始化
 */
$(document).ready(function() {
	initTabCheck();
	initMap(mapdiv);
	initCompany("chc");
	initDepartMent("chc","4423");
	initPersonTable();
	initSubButton();
	initPageInfo();
	setResourceMonth();
	initGlResource();//初始化光缆资源
	
});

//start 光缆资源
function initGlResource(){
	var city = $("#resourcecityxl").val();
	$.ajax({
		    type: 'post',
		    url: basePath+'/nmmpgis/initGlResource',
		    contentType: 'application/json;charset=utf-8',
		    data: '{"cityId": "'+city+'"}',
		    success: function (data) { //返回json结果
		    	$("#resourcetypexl").find("option").remove();
		    	var resultArr=data.data.results;
		    	 $("#resourcetypexl").append(" <option value=\"\">请选择</option>");
		    	$.each(resultArr, function (i, n) {
		    	      $("#resourcetypexl").append(" <option value=\"" + n.id + "\">" + n.text+ "</option>");
		    	});
		    }
		});
	
	
}


// end 光缆资源
function setResourceMonth(){
	var date = new Date();
	var y = date.getFullYear();
	var m = date.getMonth()+1;
	$("#resourcemonth").val(y+"-"+m)
}

/**
 * 初始化页面查询条件
 */
function initPageInfo(){
	if(mapdiv=="personmap"){
		$("#resourceMonth").datetimepicker({
			format: 'YYYY-MM'
		});
		$("#per_start").datetimepicker({
			format: 'YYYY-MM-DD HH:mm'
		});
		
		$("#per_end").datetimepicker({
			format: 'YYYY-MM-DD HH:mm'
		});
		
		$("#personcity").change(function(){ 
			initCompany($(this).children('option:selected').val());
			var cityName=$(this).children('option:selected').text();
			resetMapCenter(cityName);
		});
		$("#resourcecity").change(function(){ 
			initCompany($(this).children('option:selected').val());
			var cityName=$(this).children('option:selected').text();
			resetMapCenter(cityName);
		});
		$("#companySel").change(function(){ 
			var cityName=$("#personcity").val();
			initDepartMent(cityName,$(this).children('option:selected').val());
		});
		
	}else if(mapdiv=="taskmap"){
		$("#task_start").datetimepicker({
			format: 'YYYY-MM-DD HH:mm'
		});
		
		$("#task_end").datetimepicker({
			format: 'YYYY-MM-DD HH:mm'
		});
		
		$("#taskcity").change(function(){
			var cityName=$(this).children('option:selected').text();
			resetMapCenter(cityName);
		});
	}else  if(mapdiv=="resourcemap"){
		
		$("#resourcecity").change(function(){
			var cityName=$(this).children('option:selected').text();
			resetMapCenter(cityName);
		});
	}else  if(mapdiv=="qiandaopersonmap"){
		$("#per_qiandao").datetimepicker({
			format: 'YYYY-MM-DD'
		});
		
	
		
		$("#personcity2").change(function(){ 
			initCompany2($(this).children('option:selected').val());
			var cityName=$(this).children('option:selected').text();
			resetMapCenter(cityName);
		});
		
		$("#companySel2").change(function(){ 
			var cityName=$("#personcity").val();
			initDepartMent2(cityName,$(this).children('option:selected').val());
		});
	}else  if(mapdiv=="resourcemapxl"){
		$("#resourcecityxl").change(function(){ 
			initGlResource();
			initResourceXlTable();
		});
	}
	
}

/**
 * 初始化所属单位
 * @param cityId
 */
function initCompany(cityId){
	  $.ajax({
		    type: 'post',
		    url: basePath+'/nmmpgis/companySel',
		    contentType: 'application/json;charset=utf-8',
		    data: '{"cityId": "'+cityId+'"}',
		    success: function (data) { //返回json结果
		    	$("#companySel").find("option").remove();
		    	$("#rescompany").find("option").remove();
//		    	$("#companySel").append(" <option value=\"all\">请选择所属单位</option>");
		    	var resultArr=data.data.results;
		    	 $("#rescompany").append(" <option value=\"\">请选择</option>");
		    	$.each(resultArr, function (i, n) {
		    	      $("#companySel").append(" <option value=\"" + n.id + "\">" + n.text+ "</option>");
		    	      $("#rescompany").append(" <option value=\"" + n.id + "\">" + n.text+ "</option>");
		    	});
		    }
		});
}


function initDepartMent(cityId,companyId){
	  $.ajax({
		    type: 'post',
		    url: basePath+'/nmmpgis/departMentSel',
		    contentType: 'application/json;charset=utf-8',
		    data: '{"cityId": "'+cityId+'","companyId": "'+companyId+'"}',
		    success: function (data) { //返回json结果
		    	$("#departSel").find("option").remove();
//		    	$("#companySel").append(" <option value=\"all\">请选择所属单位</option>");
		    	var resultArr=data.data.results;
		    	$.each(resultArr, function (i, n) {
		    	      $("#departSel").append(" <option value=\"" + n.id + "\">" + n.text+ "</option>");
		    	});
		    }
		});
}

/**
 * 初始化所属单位
 * @param cityId
 */
function initCompany2(cityId){
	  $.ajax({
		    type: 'post',
		    url: basePath+'/nmmpgis/companySel',
		    contentType: 'application/json;charset=utf-8',
		    data: '{"cityId": "'+cityId+'"}',
		    success: function (data) { //返回json结果
		    	$("#companySel2").find("option").remove();
//		    	$("#companySel").append(" <option value=\"all\">请选择所属单位</option>");
		    	var resultArr=data.data.results;
		    	$.each(resultArr, function (i, n) {
		    	      $("#companySel2").append(" <option value=\"" + n.id + "\">" + n.text+ "</option>");
		    	});
		    }
		});
}


function initDepartMent2(cityId,companyId){
	  $.ajax({
		    type: 'post',
		    url: basePath+'/nmmpgis/departMentSel',
		    contentType: 'application/json;charset=utf-8',
		    data: '{"cityId": "'+cityId+'","companyId": "'+companyId+'"}',
		    success: function (data) { //返回json结果
		    	$("#departSel2").find("option").remove();
//		    	$("#companySel").append(" <option value=\"all\">请选择所属单位</option>");
		    	var resultArr=data.data.results;
		    	$.each(resultArr, function (i, n) {
		    	      $("#departSel2").append(" <option value=\"" + n.id + "\">" + n.text+ "</option>");
		    	});
		    }
		});
}
/***
 * 初始化按钮
 */
function initSubButton(){
	$("#person-serach").click(function(){
		//$("#per_qiandao").find("input").val()=null;
		var t1=$("#per_start").find("input").val();  
		var t2=$("#per_end").find("input").val();  
		$('#person_tabel').bootstrapTable('refresh');
	});
	
	$("#task-serach").click(function(){
		var t1=$("#task_start").find("input").val();  
		var t2=$("#task_end").find("input").val(); 
		$('#task_tabel').bootstrapTable('refresh');
	});
	$("#res-serach").click(function(){
		$('#resource_tabel').bootstrapTable('refresh');
		queryResourcePoints();
	});
	$("#qiandao-serach").click(function(){
		//var t1=$("#per_start").find("input").val();  
		//var t2=$("#per_end").find("input").val();  
		$('#qiandao_tabel').bootstrapTable('refresh');
	});
	$("#resxl-serach").click(function(){
		$('#resource_tabelXl').bootstrapTable('refresh');
		queryGlResourcePoints();
		var glName = $("#resourcetypexl").val();
		if(glName ==null ||glName==""){
			glFlag = "true";
		}else{
			glFlag = "false";
		}
	});
}

/**
 * 标签tab页面切换方法初始化
 */
function initTabCheck(){
	$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
	     // 获取已激活的标签页的名称
	     var activeTab = $(e.target).text();
	     // 获取前一个激活的标签页的名称
	     var previousTab = $(e.relatedTarget).text();
	     $(".active-tab span").html(activeTab);
	     $(".previous-tab span").html(previousTab);
	     if(activeTab=="巡检任务"){
	    	 mapdiv="taskmap";
	    	 initTaskTable();
	     }else if(activeTab=="资源管理"){
	    	 mapdiv="resourcemap";
	    	 initResourceTable();
	     }else if(activeTab=="代维人员"){
	    	 mapdiv="personmap";
	    	 initPersonTable();
	     }else if(activeTab=="签到管理"){
	    	 mapdiv="qiandaopersonmap";
	    	 initQiandaoTable();
	    	 initCompany2("chc");
	    	 initDepartMent2("chc","4423");
	     }else if(activeTab=="光缆资源"){
	    	 mapdiv="resourcemapxl";
	    	 initResourceXlTable();
	     }
	     initMap(mapdiv);
	     initPageInfo();
	 });
}


/**
 * 地图初始化
 * @param map 传递需要承载初始化地图的div的id
 */
function initMap(map){
	
	// 百度地图API功能
	map = new BMap.Map(map);    // 创建Map实例
	map.centerAndZoom(new BMap.Point(125.35, 43.88), 12);  // 初始化地图,设置中心点坐标和地图级别
	setTimeout(function(){
        map.setZoom(14);   
    }, 1000);
	//添加地图类型控件
	 map.addControl(new BMap.NavigationControl({  
         type: BMAP_NAVIGATION_CONTROL_LARGE, //表示显示完整的平移缩放控件。  
//       type: BMAP_NAVIGATION_CONTROL_SMALL, //表示显示小型的平移缩放控件。  
//       type: BMAP_NAVIGATION_CONTROL_PAN, //表示只显示控件的平移部分功能。  
//       type: BMAP_NAVIGATION_CONTROL_ZOOM, //表示只显示控件的缩放部分功能。  
         anchor: BMAP_ANCHOR_TOP_LEFT, //表示控件定位于地图的左上角。  
//       anchor: BMAP_ANCHOR_TOP_RIGHT, //表示控件定位于地图的右上角。  
//       anchor: BMAP_ANCHOR_BOTTOM_LEFT, //表示控件定位于地图的左下角。  
//       anchor: BMAP_ANCHOR_BOTTOM_RIGHT, //表示控件定位于地图的右下角。  
         offset: new BMap.Size(20, -10)  
     })); //设置地图平移缩放控件，PC端默认位于地图左上方type控件外观,anchor控件的停靠位置,offset偏移的位置  
     map.addControl(new BMap.MapTypeControl({  
         type: BMAP_MAPTYPE_CONTROL_HORIZONTAL,//按钮水平方式展示，默认采用此类型展示。  
//       type: BMAP_MAPTYPE_CONTROL_DROPDOWN,//按钮呈下拉列表方式展示。  
//       type: BMAP_MAPTYPE_CONTROL_MAP//以图片方式展示类型控件，设置该类型后无法指定maptypes属性。  
         mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP]  
     }));//设置地图类型控件,type控件样式,mapTypes控件展示的地图类型，默认为普通图、卫星图、卫星加路网混合图和三维图。通过此属性可配置控件展示的地图类型。   
	map.setCurrentCity("长春");          // 设置地图显示的城市 此项是必须设置的
	map.enableScrollWheelZoom(false);     //开启鼠标滚轮缩放
	//定义地图显示信息窗口
    infoWindow = new BMap.InfoWindow();  // 创建信息窗口对象
    infoWindow.addEventListener('open',function(){
//		doc.getElementById('goto1').onclick=function(){
//			map.closeInfoWindow(infoWindow);
//			goto();
//		}
	});
	window.map = map;
}


/**
 * 初始化光缆资源表格
 */
function initResourceXlTable(){
	$('#resource_tabelXl').bootstrapTable({
        url: basePath+'/nmmpgis/glresourcegrid',         //请求后台的URL（*）
        method: 'post',                      //请求方式（*）
        toolbar: '',                //工具按钮用哪个容器
        striped: true,                      //是否显示行间隔色
        cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: true,                   //是否显示分页（*）
//        sortable: false,                     //是否启用排序
//        sortOrder: "asc",                   //排序方式
        queryParams: getQueryParams,                    //传递参数（*）
        sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
        pageNumber:1,                       //初始化加载第一页，默认第一页
        pageSize: 5,                       //每页的记录行数（*）
        pageList: [10, 25, 50, 100],        //可供选择的每页的行数（*）
        search: false,                       //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
        strictSearch: true,
        showColumns: false,                  //是否显示所有的列
        showRefresh: false,                  //是否显示刷新按钮
        minimumCountColumns: 2,             //最少允许的列数
        clickToSelect: true,                //是否启用点击选中行
        uniqueId: "id",                     //每一行的唯一标识，一般为主键列
        showToggle:false,                    //是否显示详细视图和列表视图的切换按钮
        cardView: false,                    //是否显示详细视图
        detailView: false,                   //是否显示父子表
        columns: [/*{
            checkbox: true
        },*/{
        	field: 'transId',
            title: '光缆id',
            visible:false
        },{
        	field: 'city',
            title: '地市'
        },{
            field: 'transName',
            title: '光缆名称'
        },{
        	field: 'pointName',
            title: '资源点名称'
        },{
        	field: 'pointLng',
            title: '经度'
        },{
            field: 'pointLat',
            title: '纬度'
        }],
        //注册加载子表的事件。注意下这里的三个参数！
        onExpandRow: function (index, row, $detail) {
        	initSubTable(index, row, $detail);
        },
        responseHandler : function(res) {  
            return {  
                total : res.data.total,  
                rows : res.data.rows  
            };  
        }/*,
        onClickRow: function (row) {
            alert(row.personId);
        }*/
    });
}

/**
 * 初始化人员表格
 */
function initPersonTable(){
	$('#person_tabel').bootstrapTable({
        url: basePath+'/nmmpgis/perdatagrid',         //请求后台的URL（*）
        method: 'post',                      //请求方式（*）
        toolbar: '',                //工具按钮用哪个容器
        striped: true,                      //是否显示行间隔色
        cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: true,                   //是否显示分页（*）
        sortable: false,                     //是否启用排序
        sortOrder: "asc",                   //排序方式
        queryParams: getQueryParams,                    //传递参数（*）
        sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
        pageNumber:1,                       //初始化加载第一页，默认第一页
        pageSize: 5,                       //每页的记录行数（*）
        pageList: [10, 25, 50, 100],        //可供选择的每页的行数（*）
        search: false,                       //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
        strictSearch: true,
        showColumns: false,                  //是否显示所有的列
        showRefresh: false,                  //是否显示刷新按钮
        minimumCountColumns: 2,             //最少允许的列数
        clickToSelect: true,                //是否启用点击选中行
        uniqueId: "personId",                     //每一行的唯一标识，一般为主键列
        showToggle:false,                    //是否显示详细视图和列表视图的切换按钮
        cardView: false,                    //是否显示详细视图
        detailView: true,                   //是否显示父子表
        columns: [{
        	field: 'personId',
            title: '人员ID',
            visible:false
        },{
            field: 'personName',
            title: '人员名称'
        },{
        	field: 'companyId',
            title: '单位ID',
            visible:false
        },{
            field: 'companyName',
            title: '所属单位'
        },{
            field: 'source',
            title: '状态',
            formatter:function(value,row,index){  
            	 if(value=="0"){
            		 return "离线";
            	 }else{
            		 return "在线";
            	 }
            } ,
            visible:false
        },{
        	field: 'departMentId',
            title: '驻点ID',
            visible:false
        },{
            field: 'departMentName',
            title: '所属驻地'
        },],
        //注册加载子表的事件。注意下这里的三个参数！
        onExpandRow: function (index, row, $detail) {
        	initSubTable(index, row, $detail);
        },
        responseHandler : function(res) {  
            return {  
                total : res.data.total,  
                rows : res.data.rows  
            };  
        },
        onClickRow: function (row) {
            alert(row.personId);
        }
    });
}
/**
 * 初始化签到表格
 */
function initQiandaoTable(){
	$('#qiandao_tabel').bootstrapTable({
        url: basePath+'/nmmpgis/perdatagrid',         //请求后台的URL（*）
        method: 'post',                      //请求方式（*）
        toolbar: '',                //工具按钮用哪个容器
        striped: true,                      //是否显示行间隔色
        cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: true,                   //是否显示分页（*）
        sortable: false,                     //是否启用排序
        sortOrder: "asc",                   //排序方式
        queryParams: getQueryParams,                    //传递参数（*）
        sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
        pageNumber:1,                       //初始化加载第一页，默认第一页
        pageSize: 5,                       //每页的记录行数（*）
        pageList: [10, 25, 50, 100],        //可供选择的每页的行数（*）
        search: false,                       //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
        strictSearch: true,
        showColumns: false,                  //是否显示所有的列
        showRefresh: false,                  //是否显示刷新按钮
        minimumCountColumns: 2,             //最少允许的列数
        clickToSelect: true,                //是否启用点击选中行
        uniqueId: "personId",                     //每一行的唯一标识，一般为主键列
        showToggle:false,                    //是否显示详细视图和列表视图的切换按钮
        cardView: false,                    //是否显示详细视图
        //detailView: true,                   //是否显示父子表
        columns: [{
        	field: 'personId',
            title: '人员ID',
            visible:false
        },{
            field: 'personName',
            title: '人员名称'
        },{
        	field: 'companyId',
            title: '单位ID',
            visible:false
        },{
            field: 'companyName',
            title: '所属单位'
        },{
            field: 'source',
            title: '状态',
            formatter:function(value,row,index){  
            	 if(value=="0"){
            		 return "离线";
            	 }else{
            		 return "在线";
            	 }
            } ,
            visible:false
        },{
        	field: 'departMentId',
            title: '驻点ID',
            visible:false
        },{
            field: 'departMentName',
            title: '所属驻地'
        },],
        //注册加载子表的事件。注意下这里的三个参数！
        onExpandRow: function (index, row, $detail) {
        },
        responseHandler : function(res) {  
            return {  
                total : res.data.total,  
                rows : res.data.rows  
            };  
        },
        onClickRow: function (row) {
            //alert(row.personId);
        	queryExeTaskPoints2(row.personId,"","qiandao");
        }
    });
}


function initSubTable(index, row, $detail) {
	personId=row.personId;
    var cur_table = $detail.html('<table></table>').find('table');
    $(cur_table).bootstrapTable({
    	 url:basePath+'/nmmpgis/tasksubdatagrid', 
         method: "post", //请求方法
         toolbar: '',                //工具按钮用哪个容器
         striped: true,                      //是否显示行间隔色
         cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
         pagination: true,                   //是否显示分页（*）
         sortable: false,                     //是否启用排序
         sortOrder: "asc",                   //排序方式
         queryParams:querySubTasParam,                    //传递参数（*）
         sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
         pageNumber:1,                       //初始化加载第一页，默认第一页
         pageSize: 5,                       //每页的记录行数（*）
         pageList: [10, 25, 50, 100],        //可供选择的每页的行数（*）
         search: false,                       //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
         strictSearch: true,
         showColumns: false,                  //是否显示所有的列
         showRefresh: false,                  //是否显示刷新按钮
         minimumCountColumns: 2,             //最少允许的列数
         clickToSelect: true,                //是否启用点击选中行
         uniqueId: "taskId",                     //每一行的唯一标识，一般为主键列
         showToggle:false,                    //是否显示详细视图和列表视图的切换按钮
         cardView: false,                    //是否显示详细视图
         detailView: false,                   //是否显示父子表
         columns: [{
             checkbox: true
         },{
             title: '执行人ID',
             field: 'executeManId',
             align: 'center',
             visible:false
         },{
             title: '任务ID',
             field: 'cityId',
             align: 'center',
             visible:false
         }, {
             title: '任务ID',
             field: 'cityName',
             align: 'center',
             visible:false
         }, {
             title: '任务ID',
             field: 'taskId',
             align: 'center',
             visible:false
         }, {
             title: '任务名称',
             field: 'taskName',
             align: 'center'
         }, {
             title: '任务类型',
             field: 'taskType',
             align: 'center',
            formatter:function(value,row,index){  
	           	 if(value=="001"){
	           		 return "基站巡检";
	           	 }else if(value=="002"){
	           		 return "线路巡检";
	           	 }else if(value=="003"){
	           		 return "室分巡检";
	           	 }else if(value=="004"){
	           		 return "直放站巡检";
	           	 }else if(value=="005"){
	           		 return "机房/局站巡检";
	           	 }
           } 
         }, {
             title: '开始时间',
             field: 'startTime',
             align: 'center'
         }, {
             title: '结束时间',
             field: 'endTime',
             align: 'center'
         }, {
             title: '任务状态',
             field: 'taskSource',
             align: 'center'
         }],
         responseHandler : function(res) { 
             return {  
                 total : res.data.total,  
                 rows : res.data.rows  
             };  
         }  ,
         onCheck:function(row){

         },
	     onCheckAll: function (rows) {
	           //最顶上的checkbox被选中
	     },
         onClickRow: function (row) {
             queryExeTaskPoints(row.executeManId,row.taskId,row.taskType);
         }
   });
};

/**
 * 初始化任务表格
 */
function initTaskTable(){
	$('#task_tabel').bootstrapTable({
        url: basePath+'/nmmpgis/taskdatagrid',         //请求后台的URL（*）
        method: 'post',                      //请求方式（*）
        toolbar: '',                //工具按钮用哪个容器
        striped: true,                      //是否显示行间隔色
        cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: true,                   //是否显示分页（*）
        sortable: false,                     //是否启用排序
        sortOrder: "asc",                   //排序方式
        queryParams: getQueryParams,//传递参数（*）
        sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
        pageNumber:1,                       //初始化加载第一页，默认第一页
        pageSize: 5,                       //每页的记录行数（*）
        pageList: [10, 25, 50, 100],        //可供选择的每页的行数（*）
        search: false,                       //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
        strictSearch: true,
        showColumns: false,                  //是否显示所有的列
        showRefresh: false,                  //是否显示刷新按钮
        minimumCountColumns: 2,             //最少允许的列数
        clickToSelect: true,                //是否启用点击选中行
       // height: 350,                        //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
        uniqueId: "taskId",                     //每一行的唯一标识，一般为主键列
        showToggle:false,                    //是否显示详细视图和列表视图的切换按钮
        cardView: false,                    //是否显示详细视图
        detailView: true,                   //是否显示父子表
        columns: [{
        	field: 'taskId',
            title: '任务ID',
            visible:false
        },{
            field: 'taskName',
            title: '任务名称'
        }, {
            field: 'taskType',
            title: '任务类型',
            formatter:function(value,row,index){  
	           	 if(value=="001"){
	           		 return "基站巡检";
	           	 }else if(value=="002"){
	           		 return "线路巡检";
	           	 }else if(value=="003"){
	           		 return "室分巡检";
	           	 }else if(value=="004"){
	           		 return "直放站巡检";
	           	 }else if(value=="005"){
	           		 return "机房/局站巡检";
	           	 }
           } 
        }, {
            field: 'startTime',
            title: '开始时间'
        }, {
            field: 'endTime',
            title: '结束时间'
        }, {
            field: 'taskSource',
            title: '任务状态'
        }],
        //注册加载子表的事件。注意下这里的三个参数！
        onExpandRow: function (index, row, $detail) {
        	initSubPersonTable(index, row, $detail);
        },
        responseHandler : function(res) { 
            return {  
                total : res.data.total,  
                rows : res.data.rows  
            };  
        },
        onClickRow: function (row) {
        	queryTaskPoints(row.taskId,row.taskType);
        }  
    });
}


/**
 * 初始化人员任务表格
 */
function initSubPersonTable(index, row, $detail){
	taskId=row.taskId;
	taskType=row.taskType;
    var cur_table = $detail.html('<table></table>').find('table');
    $(cur_table).bootstrapTable({
    	 url:basePath+'/nmmpgis/personsubdatagrid', 
         method: "post", //请求方法
         toolbar: '',                //工具按钮用哪个容器
         striped: true,                      //是否显示行间隔色
         cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
         pagination: true,                   //是否显示分页（*）
         sortable: false,                     //是否启用排序
         sortOrder: "asc",                   //排序方式
         queryParams: querySubPerParam,                    //传递参数（*）
         sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
         pageNumber:1,                       //初始化加载第一页，默认第一页
         pageSize: 5,                       //每页的记录行数（*）
         pageList: [10, 25, 50, 100],        //可供选择的每页的行数（*）
         search: false,                       //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
         strictSearch: true,
         showColumns: false,                  //是否显示所有的列
         showRefresh: false,                  //是否显示刷新按钮
         minimumCountColumns: 2,             //最少允许的列数
         clickToSelect: true,                //是否启用点击选中行
         uniqueId: "taskId",                     //每一行的唯一标识，一般为主键列
         showToggle:false,                    //是否显示详细视图和列表视图的切换按钮
         cardView: false,                    //是否显示详细视图
         detailView: false,                   //是否显示父子表
         columns: [{
             checkbox: true
         },{
             title: '任务ID',
             field: 'taskId',
             align: 'center',
             visible:false
         },{
             title: '执行人ID',
             field: 'personId',
             align: 'center',
             visible:false
         }, {
             title: '执行人',
             field: 'personName',
             align: 'center'
         }, {
             title: '执行时间',
             field: 'executeTime',
             align: 'center'
         }],
         responseHandler : function(res) { 
             return {  
                 total : res.data.total,  
                 rows : res.data.rows  
             };  
         } ,
         onClickRow: function (row) {
             queryExeTaskPoints(row.personId,row.taskId,taskType);
         }   
   });
}


/**
 * 初始化资源表格
 */
function initResourceTable(){
	$('#resource_tabel').bootstrapTable({
        url: basePath+'/nmmpgis/resdatagrid',         //请求后台的URL（*）
        method: 'post',   //请求方式（*）
        toolbar: '',                //工具按钮用哪个容器
        striped: true,                      //是否显示行间隔色
        cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: true,                   //是否显示分页（*）
        sortable: false,                     //是否启用排序
        sortOrder: "asc",                   //排序方式
        queryParams: getQueryParams,//传递参数（*）
        sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
        pageNumber:1,                       //初始化加载第一页，默认第一页
        pageSize: 5,                       //每页的记录行数（*）
        pageList: [5,10, 20],        //可供选择的每页的行数（*）
        search: false,                       //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
        strictSearch: true,
        showColumns: false,                  //是否显示所有的列
        showRefresh: false,                  //是否显示刷新按钮
        minimumCountColumns: 2,             //最少允许的列数
        clickToSelect: true,                //是否启用点击选中行
        uniqueId: "resourceID",                     //每一行的唯一标识，一般为主键列
        showToggle:false,                    //是否显示详细视图和列表视图的切换按钮
        cardView: false,                    //是否显示详细视图
        detailView: false,                   //是否显示父子表
        columns: [{
            checkbox: true
        },{
        	field: 'resourceID',
            title: '资源ID',
            visible:false
        },{
            field: 'resourceName',
            title: '资源名称'
        },{
            field: 'resourceType',
            title: '资源类型'
        },{
            field: 'resourceLon',
            title: '资源经度'
        },{
            field: 'resourceLat',
            title: '资源纬度'
        },{
            field: 'maintainCompany',
            title: '维护单位'
        },{
            field: 'inspectState',
            title: '巡检状态'
        }],
        responseHandler : function(res) {  
            return {  
                total : res.data.total,  
                rows : res.data.rows  
            };  
        },
        onClickRow: function (row) {
        },onCheck:function(row){
        	var pointObj={};
        	pointObj.lat=row.resourceLat;
        	pointObj.lon=row.resourceLon;
        	drawResourcePoints(pointObj,row.resourceType);  
        },onUncheck:function(row){
        }  
    });  
}

/**
 * 获取资源列表查询条件信息
 */
function getQueryParams(params){	
	var param={
		pageSize: this.pageSize,
        pageNo: this.pageNumber 
	};
	console.log(param);
	if(mapdiv=="taskmap"){
		var taskName=$("#taskname").val();
		var cityName=$("#taskcity").val();
		var taskType=$("#taskType").val();
		var startTime=$("#task_start").find("input").val();  
		var endTime=$("#task_end").find("input").val();
		param.taskName=taskName;
		param.cityName=cityName;
		param.taskType=taskType;
		param.startTime=startTime;
		param.endTime=endTime;
	}else if(mapdiv=="resourcemap"){
		var resourcename=$("#resourcename").val();
	    var cityName=$("#resourcecity").find("option:selected").attr("city");
	    var resourceType=$("#resourcetype").val();
	    var rescompany = "";
	    if($("#rescompany").find("option:selected").text()!='请选择'){
	    	rescompany=$("#rescompany").find("option:selected").text();
	    }
	    var inspectstate=$("#inspectstate").val();
	    var resourcemonth=$("#resourcemonth").val();
	    param.resourceName=resourcename;
	    param.cityName=cityName;
	    param.resourceType=resourceType;
	    param.rescompany=rescompany;
	    param.inspectstate=inspectstate;
	    param.resourcemonth=resourcemonth;
	}else if(mapdiv=="personmap"){
		console.log("personmap");
		var personname=$("#personname").val();
		var cityName=$("#personcity").val();
		var startTime=$("#per_start").find("input").val();  
		var endTime=$("#per_end").find("input").val();
		param.personName=personname;
		param.cityName=cityName;
		param.startTime=startTime;
		param.endTime=endTime;
		var companyName=$("#companySel").val()==null?"4423":$("#companySel").val();
		param.companyName=companyName;
		var departMentId=$("#departSel").val()==null?"4428":$("#departSel").val();
		param.departMentId=departMentId;
	}else if(mapdiv=="qiandaopersonmap"){
		var personname=$("#personname2").val();
		var cityName=$("#personcity2").val();
		var qiandaoTime=$("#per_qiandao").find("input").val();  
		param.personName=personname;
		param.cityName=cityName;
		param.qiandaoTime=qiandaoTime;
		var companyName=$("#companySel2").val()==null?"4423":$("#companySel2").val();
		param.companyName=companyName;
		var departMentId=$("#departSel2").val()==null?"4428":$("#departSel2").val();
		param.departMentId=departMentId;
	}else if(mapdiv=="resourcemapxl"){
		var city=$("#resourcecityxl").val();
		var glName=$("#resourcetypexl").val();
		if(glName==null){
			glName = "";
		}
		param.city=city;
		param.glName=glName;
	}
	console.log(param);
	return param;
}


/**
 * 人员子表查询条件封装
 * @param params
 * @returns {___anonymous17969_18054}
 */
function querySubPerParam(params){
	var param={
		taskId:taskId,
		taskType:taskType,
		pageSize: this.pageSize,
	    pageNo: this.pageNumber 
	};
	var startTime=$("#per_start").find("input").val();  
	var endTime=$("#per_end").find("input").val();
	param.startTime=startTime;
	param.endTime=endTime;
	return param;
}



/**
 * 任务子表查询条件封装
 * @param params
 * @returns {___anonymous17969_18054}
 */
function querySubTasParam(params){
	var param={
		personId:personId,
		pageSize: this.pageSize,
	    pageNo: this.pageNumber 
	};
	var startTime=$("#per_start").find("input").val();  
	var endTime=$("#per_end").find("input").val();
	param.startTime=startTime;
	param.endTime=endTime;
	return param;
}

/**
 * 任务子表查询条件封装
 * @param params
 * @returns {___anonymous17969_18054}
 */
function querySubTasParam2(params){
	var param={
		personId:personId,
		pageSize: this.pageSize,
	    pageNo: this.pageNumber 
	};
	var startTime=$("#per_qiandao").find("input").val();  
	param.startTime=startTime;
	return param;
}

/**
 * 重置地图中心点
 * @param lat
 * @param long
 */
function resetMapCenter(cityName){
	var newmap = window.map;
	newmap.centerAndZoom(cityName, 14);  // 初始化地图,设置中心点坐标和地图级别
}

/**
 * 地图资源点
 * @param pointObj
 */
function drawResourcePoints(pointObj,resType){
	var newmap = window.map;
	var resPoint = marsTobaidu(new BMap.Point(pointObj.lon, pointObj.lat));
	var point = new BMap.Point(resPoint.lng,resPoint.lat);
	console.log(point);
	var myIcon =null;
	if(resType=="基站"){
		myIcon =new BMap.Icon("image/jz.png", new BMap.Size(17,17));
	}else if(resType=="室分"){
		myIcon =new BMap.Icon("image/sf.png", new BMap.Size(17,17));
	}else if(resType=="直放站"){
		myIcon =new BMap.Icon("image/zfz.png", new BMap.Size(17,17));
	}else if(resType=="人手井"){
		myIcon =new BMap.Icon("image/rsj.png", new BMap.Size(17,17));
	}else if(resType=="电杆"){
		myIcon =new BMap.Icon("image/dg.png", new BMap.Size(17,17));
	}else if(resType=="标石"){
		myIcon =new BMap.Icon("image/bs.png", new BMap.Size(17,17));
	}
	   
	var marker = new BMap.Marker(point,{icon:myIcon});  // 创建标注
	newmap.addOverlay(marker);
	newmap.centerAndZoom(point, 15);// 将标注添加到地图中
	marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
}

/**
 * 向地图上画任务固定的点
 * @param pointArr
 * @param taskType
 */
function drawTaskPoints(pointArr,taskType){
	var newmap = window.map;
	var dwpoint=null;
	var myIcon =null;
	var pois=[];
	if(taskType=="002"){
		myIcon =new BMap.Icon("image/ywcrw.png", new BMap.Size(17,17));
	}else if(taskType=="001"){
		myIcon =new BMap.Icon("image/jz.png", new BMap.Size(17,17));
	}else if(taskType=="003"){
		myIcon =new BMap.Icon("image/sf.png", new BMap.Size(17,17));
	}else if(taskType=="004"){
		myIcon =new BMap.Icon("image/zfz.png", new BMap.Size(17,17));
	}else if(taskType=="005"){
		myIcon =new BMap.Icon("image/jf.png", new BMap.Size(17,17));
	}
	$.each(pointArr, function (i, n) {
		
		var resPoint = marsTobaidu(new BMap.Point(n.pointLng, n.pointLat));
		var point = new BMap.Point(resPoint.lng,resPoint.lat);
		pois.push(point);
		if(taskType=="002"){
			if(n.passStatus==""){
				myIcon =new BMap.Icon("image/rw.png", new BMap.Size(17,17));
			}else if(n.passStatus=="false"){
				myIcon =new BMap.Icon("image/ljrw.png", new BMap.Size(17,17));
			}
		}
		var marker = new BMap.Marker(point,{icon:myIcon});  // 创建标注
		newmap.addOverlay(marker);
		newmap.centerAndZoom(point, 15);// 将标注添加到地图中
	});
//	myIcon=new BMap.Icon("image/xl.png", new BMap.Size(17,17));
//	var polyline =new BMap.Polyline(pois, {
//		   enableEditing: false,//是否启用线编辑，默认为false
//		   enableClicking: true,//是否响应点击事件，默认为true
////		   icons:[myIcon],
//		   strokeWeight:'8',//折线的宽度，以像素为单位
//		   strokeOpacity: 0.8,//折线的透明度，取值范围0 - 1
//		   strokeColor:"#18a45b" //折线颜色
//	});
//
//		map.addOverlay(polyline); 
}

/**
 * 向地图上画执行人执行点
 * @param pointArr
 */
function drawExecTaskPoints(pointArr){
	var newmap = window.map;
}
/**
 * GPS经纬度转换到百度经纬度
 * @param mars_point
 * @returns {___anonymous20991_21008}
 */
function marsTobaidu(mars_point) {
    var baidu_point = { lng: 0, lat: 0 };
    var x = mars_point.lng;
    var y = mars_point.lat;

    var longP=parseFloat(x);
    var lantP=parseFloat(y);  
    var gcj02p = wgs84togcj02(longP,lantP); 
    var bd9p = gcj02tobd09(gcj02p[0],gcj02p[1]);
    
    baidu_point.lng = bd9p[0].toFixed(6);
    baidu_point.lat = bd9p[1].toFixed(6);
    return baidu_point;
}


/**
 * 谷歌经纬度转换到百度经纬度
 * @param googleTobaidu
 */
function googleTobaidu(mars_point) {
    var baidu_point = { lng: 0, lat: 0 };
    var x = mars_point.lng;
    var y = mars_point.lat;
    
    var z= Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * x_pi);
    var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * x_pi);
    baidu_point.lng = z * Math.cos(theta) + 0.0065;
    baidu_point.lat = z * Math.sin(theta) + 0.006;
    return baidu_point;
}
/**
* 判断是否在国内，不在国内则不做偏移
* @param lng
* @param lat
* @returns {boolean}
*/
function out_of_china(lng, lat) { 
	return (lng < 72.004 || lng > 137.8347) || ((lat < 0.8293 || lat > 55.8271) || false);
}

function transformlat(lng, lat) { 
	var ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng));
	ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
	ret += (20.0 * Math.sin(lat * PI) + 40.0 * Math.sin(lat / 3.0 * PI)) * 2.0 / 3.0;
	ret += (160.0 * Math.sin(lat / 12.0 * PI) + 320 * Math.sin(lat * PI / 30.0)) * 2.0 / 3.0;
	return ret
}
function transformlng(lng, lat) { 
	var ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng));
	ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
	ret += (20.0 * Math.sin(lng * PI) + 40.0 * Math.sin(lng / 3.0 * PI)) * 2.0 / 3.0;
	ret += (150.0 * Math.sin(lng / 12.0 * PI) + 300.0 * Math.sin(lng / 30.0 * PI)) * 2.0 / 3.0;
	return ret
}
/**
* WGS84转GCj02
* @param lng
* @param lat
* @returns {*[]}
*/
function wgs84togcj02(lng, lat) { 
	if (out_of_china(lng, lat)) {
		return [lng, lat]
	}
	else {
		var dlat = transformlat(lng - 105.0, lat - 35.0);
		var dlng = transformlng(lng - 105.0, lat - 35.0);
		var radlat = lat / 180.0 * PI;
		var magic = Math.sin(radlat);
		magic = 1 - ee * magic * magic;
		var sqrtmagic = Math.sqrt(magic);
		dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI);
		dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI);
		var mglat = lat + dlat;
		var mglng = lng + dlng;
		return [mglng, mglat]
	}
}
/**
* 百度坐标系 (BD-09) 与 火星坐标系 (GCJ-02)的转换
* 即 百度 转 谷歌、高德
* @param bd_lon
* @param bd_lat
* @returns {*[]}
*/ 
//	function bd09togcj02(bd_lon, bd_lat) { 
//	　　var x_pi = 3.14159265358979324 * 3000.0 / 180.0;
//	　　var x = bd_lon - 0.0065;
//	　　var y = bd_lat - 0.006;
//	　　var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
//	　　var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
//	　　var gg_lng = z * Math.cos(theta);
//	　　var gg_lat = z * Math.sin(theta);
//	　　return [gg_lng, gg_lat]
//	}
/**
* 火星坐标系 (GCJ-02) 与百度坐标系 (BD-09) 的转换
* 即谷歌、高德 转 百度
* @param lng
* @param lat
* @returns {*[]}
*/
function gcj02tobd09(lng, lat) { 

	var z = Math.sqrt(lng * lng + lat * lat) + 0.00002 * Math.sin(lat * x_pi);
	var theta = Math.atan2(lat, lng) + 0.000003 * Math.cos(lng * x_pi);
	var bd_lng = z * Math.cos(theta) + 0.0065;
	var bd_lat = z * Math.sin(theta) + 0.006;

	return [bd_lng, bd_lat]
}
/**
* GCJ02 转换为 WGS84
* @param lng
* @param lat
* @returns {*[]}
*/
function gcj02towgs84(lng, lat) { 
	if (out_of_china(lng, lat)) {
		return [lng, lat];
	}
	else {
		var dlat = transformlat(lng - 105.0, lat - 35.0);
		var dlng = transformlng(lng - 105.0, lat - 35.0);
		var radlat = lat / 180.0 * PI;
		var magic = Math.sin(radlat);
		magic = 1 - ee * magic * magic;
		var sqrtmagic = Math.sqrt(magic);
		dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI);
		dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI);
		mglat = lat + dlat;
		mglng = lng + dlng;
		return [lng * 2 - mglng, lat * 2 - mglat];
	}
}

/**
 * 查询任务经纬度点
 * @param taskId
 * @param taskType
 */
function queryTaskPoints(taskId,taskType){
	$.ajax({
	    type: 'post',
	    url: basePath+'/nmmpgis/queryTaskPoints',
	    contentType: 'application/json;charset=utf-8',
	    data: '{"taskId": "'+taskId+'","taskType":"'+taskType+'"}',
	    success: function (data) { //返回json结果
	    	var resultArr=data.data.results;
	    	drawTaskPoints(resultArr,taskType);
	    }
	});
}

//写资源点
function queryResourcePoints(){
	var resourcename = $('#resourcename').val();
	var resourcecity = $("#resourcecity").find("option:selected").attr("city");
	var rescompany="";
	if($('#rescompany').find("option:selected").text()!='请选择'){
		rescompany = $('#rescompany').find("option:selected").text();
	}
	var resourcetype = $('#resourcetype').val();
	var inspectstate = $('#inspectstate').val();
	var resourcemonth = $('#resourcemonth').val();
	if(""==resourcemonth){
		alert("巡检时间不可以为空！")
		return;
	}
	$.ajax({
	    type: 'post',
	    url: basePath+'/nmmpgis/queryResourcePoints',
	    contentType: 'application/json;charset=utf-8',
	    data: '{"resourcecity": "'+resourcecity+'","resourcetype":"'+resourcetype+'","resourcemonth":"'+resourcemonth+
	    '","resourcename":"'+resourcename+'","rescompany":"'+rescompany+'","inspectstate":"'+inspectstate+'"}',
	    success: function (data) { //返回json结果
	    	var resultArr=data.data.results;
	    	drawResourcePointsAll(resultArr,inspectstate);
	    	
	    }
	});
}

function queryGlResourcePoints(){
	var city = $('#resourcecityxl').val();
	var glName = $('#resourcetypexl').val();
	$.ajax({
	    type: 'post',
	    url: basePath+'/nmmpgis/queryResourceGlPoints',
	    contentType: 'application/json;charset=utf-8',
	    data: '{"city": "'+city+'","glName":"'+glName+'"}',
	    success: function (data) { //返回json结果
	    	var resultArr=data.data.results;
	    	drawResourceGlPointsAll(resultArr);
	    	console.log(resultArr);
	    }
	});
}
//偏移
function drawResourceGlPointsAll(resultArr){
	var newmap = window.map;
//	var newmap = new BMap.Map("allmap");
	newmap.clearOverlays();
	var centerPoint;//最后初始化地图和初始化显示地图中心点时使用的变量
	var sy = new BMap.Symbol(BMap_Symbol_SHAPE_BACKWARD_OPEN_ARROW,{
		scale:0.6,
		strokeColor:"#fff",
		strokeWeight:2
	});
	var icons = new BMap.IconSequence(sy,'10','30');
	var pointLineArr = new Array();
	if(glFlag =="false"){//单条
		$.each(resultArr, function (i, n) {
			var resPoint = googleTobaidu(new BMap.Point(n.pointLng, n.pointLat));
			var point  = new BMap.Point(resPoint.lng,resPoint.lat);
			pointLineArr.push(point);
			centerPoint=point;
			myIcon =new BMap.Icon("image/dh.png", new BMap.Size(17,17));
			var marker = new BMap.Marker(point,{icon:myIcon});  // 创建标注
			marker.setTitle(n.pointName);
			marker.addEventListener("click",markonclickres);
			newmap.addOverlay(marker);
		});
		var line = new BMap.Polyline(pointLineArr,{
			enableEditing:false,
			enableClicking:true,
			icons:[],
			strokeWeight:8,
			strokeOpacity:0.8,
			strokeColor:"#18a45b"
		})
		newmap.addOverlay(line);
	}else{//多条
		for(var i=0;i<resultArr.length;i++){
			var resPoint = googleTobaidu(new BMap.Point(resultArr[i].pointLng, resultArr[i].pointLat));
    		var point  = new BMap.Point(resPoint.lng,resPoint.lat);
			if(i<resultArr.length-1 && resultArr[i].inspectstate!=resultArr[i+1].inspectstate){
	    		pointLineArr.push(point);
				var line = new BMap.Polyline(pointLineArr,{
					enableEditing:false,
					enableClicking:true,
					icons:[],
					strokeWeight:8,
					strokeOpacity:0.8,
					strokeColor:"#18a45b"
				})
				newmap.addOverlay(line);
				pointLineArr = [];
			}else if(i==resultArr.length-1){
	    		pointLineArr.push(point);
				var line = new BMap.Polyline(pointLineArr,{
					enableEditing:false,
					enableClicking:true,
					icons:[],
					strokeWeight:8,
					strokeOpacity:0.8,
					strokeColor:"#18a45b"
				})
				newmap.addOverlay(line);
			}else{
	    		pointLineArr.push(point);
	    		centerPoint=point;
			}
			myIcon =new BMap.Icon("image/dh.png", new BMap.Size(17,17));
			var marker = new BMap.Marker(point,{icon:myIcon});  // 创建标注
			marker.setTitle(resultArr[i].pointName);
			marker.addEventListener("click",markonclickres);
			newmap.addOverlay(marker);
		}
	}
	newmap.centerAndZoom(centerPoint, 15);
}

function drawResourcePointsAll(pointArr,type){
	var newmap = window.map;
	newmap.clearOverlays();
	 var centerPoint;//最后初始化地图和初始化显示地图中心点时使用的变量
	if("true"==type){
		$.each(pointArr, function (i, n) {
			var resPoint = marsTobaidu(new BMap.Point(n.pointLng, n.pointLat));
			var point = new BMap.Point(resPoint.lng,resPoint.lat);
			myIcon =new BMap.Icon("image/jzgreen.png", new BMap.Size(17,17));
			var marker = new BMap.Marker(point,{icon:myIcon});  // 创建标注
			marker.setTitle(n.pointName+"-"+n.exePersonName);
			marker.addEventListener("click",markonclickres);
			newmap.addOverlay(marker);
			centerPoint=point;
			//pointLineArr.push(point);
		});
	}else if("false"==type){
		$.each(pointArr, function (i, n) {
			var resPoint = marsTobaidu(new BMap.Point(n.pointLng, n.pointLat));
			var point = new BMap.Point(resPoint.lng,resPoint.lat);
			myIcon =new BMap.Icon("image/jzred.png", new BMap.Size(17,17));
			var marker = new BMap.Marker(point,{icon:myIcon});  // 创建标注
			marker.setTitle(n.pointName+"-"+n.exePersonName);
			marker.addEventListener("click",markonclickres);;
			newmap.addOverlay(marker);
			centerPoint=point;
			//pointLineArr.push(point);
		});
	}else{
		$.each(pointArr, function (i, n) {
			var resPoint = marsTobaidu(new BMap.Point(n.pointLng, n.pointLat));
			var point = new BMap.Point(resPoint.lng,resPoint.lat);
			/*if(n.inspectstate=='true'){
				myIcon =new BMap.Icon("image/jzgreen.png", new BMap.Size(14,14));
			}else{
				myIcon =new BMap.Icon("image/jzred.png", new BMap.Size(14,14));
			}*/
			myIcon =new BMap.Icon("image/jz.png", new BMap.Size(17,17));
			var marker = new BMap.Marker(point,{icon:myIcon});  // 创建标注
			marker.setTitle(n.pointName+"-"+n.exePersonName);
			marker.addEventListener("click",markonclickres);
			newmap.addOverlay(marker);
			centerPoint=point;
			//pointLineArr.push(point);
		});
	}
	newmap.centerAndZoom(centerPoint, 15);
}

function queryExeTaskPoints(personId,taskId,taskType){
	
	//var qiandaoTime=$("#per_qiandao").find("input").val();  
	
	$.ajax({
	    type: 'post',
	    url: basePath+'/nmmpgis/queryExeTaskPoints',
	    contentType: 'application/json;charset=utf-8',
	    data: '{"taskId": "'+taskId+'","taskType":"'+taskType+'","personId":"'+personId+'"}',
	    success: function (data) { //返回json结果
	    	var resultArr=data.data.results;
	    	var resultArr2=data.data.results2;
	    	drawExeTaskPoints(resultArr,taskType,resultArr2,null);
	    	
	    }
	});
}
function queryExeTaskPoints2(personId,taskId,taskType){
	
	var qiandaoTime=$("#per_qiandao").find("input").val();  
	
	$.ajax({
	    type: 'post',
	    url: basePath+'/nmmpgis/queryExeTaskPoints',
	    contentType: 'application/json;charset=utf-8',
	    data: '{"taskId": "'+taskId+'","taskType":"'+taskType+'","personId":"'+personId+'","qiandaoTime":"'+qiandaoTime+'"}',
	    success: function (data) { //返回json结果
	    	var resultArr=data.data.results;
	    	var resultArr2=data.data.results2;
	    	var resultArr3=data.data.results3;
	    	drawExeTaskPoints(resultArr,'qiandao',resultArr2,resultArr3);
	    	
	    }
	});
}
//pointArr执行任务中的打点和pointArr2任务点
//
//pointArr3签到点
function drawExeTaskPoints(pointArr,taskType,pointArr2,pointArr3){
	
	var newmap = window.map;
	newmap.clearOverlays();
	 var centerPoint;//最后初始化地图和初始化显示地图中心点时使用的变量
	$.each(pointArr, function (i, n) {
		var resPoint = marsTobaidu(new BMap.Point(n.pointLng, n.pointLat));
		var point = new BMap.Point(resPoint.lng,resPoint.lat);
		myIcon =new BMap.Icon("image/bluecircle.png", new BMap.Size(17,17));
		var marker = new BMap.Marker(point,{icon:myIcon});  // 创建标注
		newmap.addOverlay(marker);
		centerPoint=point;
		//pointLineArr.push(point);
	});
	// var polyline = new BMap.Polyline(pointLineArr, {strokeColor:"blue", strokeWeight:5,strokeOpacity:0,strokeStyle:'dashed'});	
	// newmap.addOverlay(polyline);   //增加折线
	 //签到功能注释掉资源显示部分
	if(taskType!='qiandao')
	 { 
	 $.each(pointArr2, function (i, n) {
			var resPoint = marsTobaidu(new BMap.Point(n.pointLng, n.pointLat));
			var point = new BMap.Point(resPoint.lng,resPoint.lat);
			myIcon =new BMap.Icon("image/yellowcircle.png", new BMap.Size(17,17));
			var marker = new BMap.Marker(point,{icon:myIcon});  // 创建标注
			marker.setTitle(n.pointName);
			marker.addEventListener("click",markonclick);
			newmap.addOverlay(marker);
			centerPoint=point;
		});
	 }
	 if(taskType=='qiandao'&&pointArr3!=null)
	 { 
		 $.each(pointArr3, function (i, n) {
				var resPoint = marsTobaidu(new BMap.Point(n.pointLng, n.pointLat));
				var point = new BMap.Point(resPoint.lng,resPoint.lat);
				myIcon =new BMap.Icon("image/dh.png", new BMap.Size(17,17));
				var marker = new BMap.Marker(point,{icon:myIcon});  // 创建标注
				
				marker.setTitle(n.pointName+n.exeStartTime);
				marker.addEventListener("click",markonclickqiandao);
				newmap.addOverlay(marker);
				centerPoint=point;
				//pointLineArr2.push(point);
			});
	 }
	 newmap.centerAndZoom(centerPoint, 15);// 初始化创建地图，并将中心设置为最后一个坐标点
}

/**
 * 地图覆盖物点击事件
 * @param {Object} e
 */
function markonclick(e){
	var p=e.target;
	var infoPoint=new BMap.Point(p.getPosition().lng,p.getPosition().lat);
	var gcj02p=bd09togcj02(p.getPosition().lng,p.getPosition().lat);
    var newpoint=gcj02towgs84(gcj02p[0],gcj02p[1]); 
	
	var sContent ="<div id='gotodiv'><p style='margin:0;line-height:1.5;font-size:13px;'>" +
			"<i class='uicon ui-13'></i><span>任务点：</span>"+p.getTitle()+
			"<br/><i class='uicon ui-1'></i><span>经度：</span>"+newpoint[0].toFixed(6)+
			"<br/><i class='uicon ui-2'></i><span>纬度：</span>"+newpoint[1].toFixed(6)+
			
			"</p><hr style='height:1px;border:none;border-top:1px solid #555555;' />"+
			"</div>";
	address=p.getLabel();
	var infoTitle="<div><h4>任务点详情</h4><hr style='height:1px;border:none;border-top:1px solid #555555;' /></div>";
	infoWindow.setTitle(infoTitle);
	infoWindow.setContent(sContent);
	map.openInfoWindow(infoWindow,infoPoint);
}
/**
 * 地图覆盖物点击事件
 * @param {Object} e
 */
function markonclickres(e){
	var p=e.target;
	var infoPoint=new BMap.Point(p.getPosition().lng,p.getPosition().lat);
	var gcj02p=bd09togcj02(p.getPosition().lng,p.getPosition().lat);
    var newpoint=gcj02towgs84(gcj02p[0],gcj02p[1]); 
	var task = p.getTitle().split("-")[0];
	var exePerson = p.getTitle().split("-")[1];
	if(null==exePerson||"null"==exePerson){
		var sContent ="<div id='gotodiv'><p style='margin:0;line-height:1.5;font-size:13px;'>" +
		"<i class='uicon ui-13'></i><span>任务点：</span>"+task+
		"<br/><i class='uicon ui-1'></i><span>经度：</span>"+newpoint[0].toFixed(6)+
		"<br/><i class='uicon ui-2'></i><span>纬度：</span>"+newpoint[1].toFixed(6)+
		
		"</p><hr style='height:1px;border:none;border-top:1px solid #555555;' />"+
		"</div>";
	}else{
		var sContent ="<div id='gotodiv'><p style='margin:0;line-height:1.5;font-size:13px;'>" +
		"<i class='uicon ui-13'></i><span>任务点：</span>"+task+
		"<br/><i class='uicon ui-13'></i><span>执行人：</span>"+exePerson+
		"<br/><i class='uicon ui-1'></i><span>经度：</span>"+newpoint[0].toFixed(6)+
		"<br/><i class='uicon ui-2'></i><span>纬度：</span>"+newpoint[1].toFixed(6)+
		
		"</p><hr style='height:1px;border:none;border-top:1px solid #555555;' />"+
		"</div>";
	}
	
	address=p.getLabel();
	var infoTitle="<div><h4>任务点详情</h4><hr style='height:1px;border:none;border-top:1px solid #555555;' /></div>";
	infoWindow.setTitle(infoTitle);
	infoWindow.setContent(sContent);
	map.openInfoWindow(infoWindow,infoPoint);
}

/**
 * 地图覆盖物点击事件
 * @param {Object} e
 */
function markonclickqiandao(e){
	var p=e.target;
	var infoPoint=new BMap.Point(p.getPosition().lng,p.getPosition().lat);
	var gcj02p=bd09togcj02(p.getPosition().lng,p.getPosition().lat);
    var newpoint=gcj02towgs84(gcj02p[0],gcj02p[1]); 
	
	var sContent ="<div id='gotodiv'><p style='margin:0;line-height:1.5;font-size:13px;'>" +
			"<i class='uicon ui-13'></i><span>任务点：</span>"+p.getTitle()+
			"<br/><i class='uicon ui-1'></i><span>经度：</span>"+newpoint[0].toFixed(6)+
			"<br/><i class='uicon ui-2'></i><span>纬度：</span>"+newpoint[1].toFixed(6)+
			
			"</p><hr style='height:1px;border:none;border-top:1px solid #555555;' />"+
			"</div>";
	address=p.getLabel();
	var infoTitle="<div><h4>任务点详情</h4><hr style='height:1px;border:none;border-top:1px solid #555555;' /></div>";
	infoWindow.setTitle(infoTitle);
	infoWindow.setContent(sContent);
	map.openInfoWindow(infoWindow,infoPoint);
}